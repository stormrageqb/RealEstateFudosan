import React from "react";
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from "react";
import AgentCard from "./AgentCard"
import axios from "axios"
import { useCookies } from "react-cookie";


const AgentBoard = (props) => {

    const history = useHistory();
    const [cookies, setCookies] = useCookies();
    const [isAdmin, setIsAdmin] = useState();
    const [myId, setMyId] = useState();
    const [agents, setAgents] = useState([]);
    const [activeAgentCategory, setActiveAgentCategory] = useState("司法書士");
    const [displayAgents, setDisplayAgents] = useState(false);

    useEffect(() => {
        const fetchAgentData = async () => {
          const response = await axios.get("/getAgent");
          setAgents(response.data);
        };
        fetchAgentData();
      }, []);

      console.log(agents)
      const agentCardClicked = (props) => {
        const agentId = props.agentId;
        const posterId = props.posterId;
    
        if (cookies.token) {
          if (isAdmin || posterId === myId) {
            const searchParams = new URLSearchParams({
              agentId: agentId,
              posterId: posterId,
            }).toString();
            history.push(`/admin-contact-agent?${searchParams}`);
          } else {
            const searchParams = new URLSearchParams({
              "previous-page": "itemBoardPage",
              agentId: agentId,
              opponentId: posterId,
            }).toString();
            history.push(`message-detail?${searchParams}`);
          }
        } else {
          history.push("login");
        }
      };
      const handleDisplayAgentsToggle = (value) => {
        setDisplayAgents(value);
      };



    return(
        <div className="hidden lg:block relative mt-4 mb-[24px] w-[550px] h-[1300px] p-2  bg-white shadow-lg rounded-2xl">
           
            <div className="flex flex-col items-center w-[550px] h-[1300px]  pt-[50px] pb-[55px] text-center  overflow-y-scroll no-scrollbar">
              <div className="flex relative border-b-2 pt-[2px] border-black w-[500px] font-medium transition-all duration-300">
                <span
                  className=" w-[33%] cursor-pointer pb-3"
                  onClick={() => setActiveAgentCategory("不動産業者")}
                >
                  不動産業者
                </span>
                <span
                  className=" w-[34%] cursor-pointer"
                  onClick={() => setActiveAgentCategory("司法書士")}
                >
                  司法書士
                </span>
                <span
                  className=" w-[33%] cursor-pointer"
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
              {agents.map(
                (agent, index) =>
                  agent.category === activeAgentCategory && (
                    <div
                      className="pt-[25px]"
                      onClick={() =>
                        agentCardClicked({
                          agentId: agent._id,
                          posterId: agent.posterId,
                        })
                      }
                    >
                      <AgentCard agent={agent} key={index} />
                    </div>
                  )
              )}
            </div>
          </div>
    )
}

export default AgentBoard;
