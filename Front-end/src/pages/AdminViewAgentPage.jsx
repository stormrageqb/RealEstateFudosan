import React, { useEffect, useState } from "react";
import ApproveAgentModal from "../components/ApproveAgentModal";
import axios from "axios";
import Loading from "../components/Loading";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AdminViewAgentPage = () => {
  const history = useHistory();

  const [activeAgentCategory, setActiveAgentCategory] = useState("司法書士");
  const [showApproveAgentModal, setShowApproveAgentModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState();
  const [agents, setAgents] = useState(null);
  const [isLarge, setIsLarge] = useState();

  const handleAgentClicked = (index) => {
    setSelectedAgent(agents[index]);
    setShowApproveAgentModal(true);
  };
  const handleToggleShowModal = (value) => {
    setShowApproveAgentModal(value);
  };
  
  // const handleApproveToggle = () => {
  //     setApproved((prevState) => !prevState);
  // }
  const handleContactPosterButtonClicked = (e, agent) => {
    e.stopPropagation();
    const searchParams = new URLSearchParams();
    searchParams.set("agentId", agent._id);
    searchParams.set("posterId", agent.posterId);
    history.push(`/admin-contact-agent?${searchParams.toString()}`);
  };
  const handleApproveToggleBtnClicked = async (e, agent) => {
    e.stopPropagation();
    const approved = agent.approved;
    if (approved) {
      try {
        const agentId = agent._id;
        const res = await axios.post("/disapproveAgent", { agentId });
        fetchAgentData();
      } catch (error) {
        console.log({ error: error.message });
      }
    } else {
      try {
        const agentId = agent._id;
        const res = await axios.post("/approveAgent", { agentId });
        fetchAgentData();
      } catch (error) {
        console.log({ error: error.message });
      }
    }
  };
  const fetchAgentData = async () => {
    const res = await axios.get("/getAgentByAdmin");
    console.log("---------------------------", res.data);
    setAgents(res.data);
  };

  useEffect(() => {
    if (showApproveAgentModal === false) {
      fetchAgentData();
    }
    const handleResize = () => {
      setIsLarge(window.innerWidth > 976);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showApproveAgentModal]);


  if (agents === null) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="relative flex flex-col items-center w-full pt-12 sm:pt-20 bg-[#F1F1F1] font-normal">
      <div className="text-center text-[24px] sm:text-[32px] font-semibold">
        エージェントを見る
      </div>
      <div className="flex relative border-b-2 pt-10 border-black w-[330px] sm:w-[500px] transition-all duration-300">
        <span
          className=" w-[33%] cursor-pointer text-center pb-3"
          onClick={() => setActiveAgentCategory("不動産業者")}
        >
          不動産業者
        </span>
        <span
          className=" w-[34%] cursor-pointer text-center"
          onClick={() => setActiveAgentCategory("司法書士")}
        >
          司法書士
        </span>
        <span
          className=" w-[33%] cursor-pointer text-center"
          onClick={() => setActiveAgentCategory("投資家")}
        >
          投資家
        </span>
        <div
          className={`absolute w-[33.3%] h-1 bottom-0 bg-[#f13f13] rounded-md transition-all duration-500 ${
            activeAgentCategory === "不動産業者"
              ? "left-0"
              : activeAgentCategory === "司法書士"
              ? "left-[33.3%]"
              : "left-[66.6%]"
          }`}
        ></div>
      </div>
      {agents.length === 0 && (
        <div className="pt-[200px] text-3xl text-center font-medium">
          ここに掲載されたエージェントはありません。
        </div>
      )}
      <div
        className={`grid gap-x-8 xl:gap-x-16 gap-y-5 max-w-[1250px] min-h-[350px] pt-10 pb-24
            ${agents.length > 1 && isLarge ? "grid-cols-2" : "grid-cols-1"}`}
      >
        {agents.map((agent, index) => {
          const approved = agent.approved;
          return (
            agent.category === activeAgentCategory && (
              <div
                key={index}
                className="flex flex-col items-center w-[350px] sm:w-[450px] xl:w-[500px] px-4 py-4 bg-white rounded-lg border-[1px] border-black/30 cursor-pointer"
                onClick={() => handleAgentClicked(index)}
              >
                <div className="">
                  {" "}
                  {agent.agentName.firstNameGanji}さん, {agent.companyName}
                </div>
                <div className="text-xs pt-3 line-clamp-3 min-h-[50px]">
                  {agent.content}
                </div>
                <div className="flex justify-between gap-4 mt-4">
                  <button
                    className="w-[150px] py-1 text-white bg-[#2A6484] text-sm font-medium rounded-xl cursor-pointer "
                    onClick={(e) => handleContactPosterButtonClicked(e, agent)}
                  >
                    投稿者への連絡
                  </button>
                  <button
                    className="w-[150px] py-1 text-[#2A6484] bg-white text-sm font-medium rounded-xl cursor-pointer border-[2px] border-[#2A6484]"
                    onClick={(e) => {
                      handleApproveToggleBtnClicked(e, agent);
                    }}
                  >
                    {approved ? "掲示板に削除する" : "掲示板に投稿する"}
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
      {showApproveAgentModal && (
        <ApproveAgentModal
          agent={selectedAgent}
          handleToggleShowModal={handleToggleShowModal}
        />
      )}
    </div>
  );
};

export default AdminViewAgentPage;
