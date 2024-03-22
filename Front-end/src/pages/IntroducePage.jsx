import React from 'react'
import { Link, useHistory } from "react-router-dom";
import topImage from '../assets/introduce/1.png'
import middleImage from '../assets/introduce/2.png'
import bottomImage from '../assets/introduce/3.png'
import bottomLeftImage from '../assets/introduce/4.png'
import bottomRightImage from '../assets/introduce/5.png'
import bottomcontractImage from '../assets/introduce/6.jpg'

export default function () {

  const history = useHistory();
  return (
    <div className='w-[90%] sm:w-[600px] md:w-[750px] lg:w-[900px] xl:w-[1400px] container'>
      <div className='flex flex-col gap-6 items-center pt-[50px]'>
        <p className='text-[32px]'>
          「ふどうさん市場」のご案内
        </p>
        <p className='text-lg'>
          もっと不動産を流動的にして有効に活用できる方々が今までよりも簡易に取得出来るようにしょう！
        </p>
      </div>
      <div className='mt-[50px] bg-gray-500 flex '   >
        <img className='h-[500px] w-[1200px]' src={topImage}></img>
        <p className='flex justify-center items-center text-center text-white text-[26px] px-[110px]'>不動産の新しい市場を提供します</p>
      </div>
      
      <div className='flex items-start justify-center gap-12 pt-[80px]'>
        <div className='text-[24px]'> 
          <p>売る人と買う人が直接出会う</p>
        </div>
        <div className='w-[870px]'>

          <p className='p-[15px] bg-gray-200'>ふどうさん市場は、売り手と買い手が直接コミュニケーションできるマッチングサービスです。
            長い幸せな思い出が込められた実家に別れを言うので、そこの意味ある考えを任せられる相手を選びたいという売り手の心情はよく分かります。
            私たちが目指すのは、その心と家にとどまる温もりを、新しい生活の場へと導くストーリーの実現です。
          ふどうさん市場では直接話を交わすことができ、売り手自身が「この人には」と思う買い手を事前に確認できます。 家と思い出が大切に育つことを願っています。</p> 
        </div>
      </div>

      <div className='pt-[50px] flex justify-center items-end gap-[100px]'> 
        <div>
          <img className='w-[350px] h-[350px]' src={middleImage}></img>
        </div>
        <div>
          <p className='text-[36px]'>あなたに売りたい。</p>
        </div>
      </div>

      <div className='flex items-start justify-center gap-12 pt-[35px]'>
        <div className='text-[24px]'> 
          <p>インターネットで気軽に商談</p>
        </div>
        <div className='w-[870px]'>

          <p className='p-[15px] bg-gray-200'>ふどうさん市場では、売り手と買い手のコミュニケーションをフェーズに関わらず、フレキシブルにサポートいたします。
          「メッセージボード」を使用すれば、いつでもどこからでも物件情報の交換や商論が可能です。掲載・契約プロセスもメール中心となっており、自宅から遠隔地の空家取引まで、ユーザーのペースで手続きを進め頂けます。
          加えて、ふどうさん市場の専任スタッフは全プロセスをサポートいたします。随時アドバイスやアシストを行なうため、安心して取引プロセスを進めていただけるシステムとなっております。
          家いちばなら、時間と場所の制約なく、最適な相手と適切なペースで取引できる環境を用意しております。</p> 
        </div>

      </div>

      <div className='flex justify-center'>
        <img className='w-[800px] h-[600px]' src = {bottomImage}></img>
      </div>

      <div className='flex items-start justify-center gap-12 pt-[35px]'>
        <div className='text-[24px]'> 
          <p>不動産売買をもっとシンプルに！</p>
        </div>
        <div className='w-[870px]'>

          <p className='p-[15px] bg-gray-200'>一般的な不動産流通では、売主と買主に別個の仲介会社が入り、それぞれの会社間で「間接的な取引交渉」が行われるのが常識です(図参照)。
          これに対し、ふどうさん市場は取引の流れを劇的に簡素化しました。当サービスでは直接、売主と買主が「一対一のやりとり」可能となっています。
          邪魔な第三者を通さずに希望条件を直接伝え合えます。真に相手のニーズに応えられる取引環境を構築できたと、私達は信じております。</p> 
        </div>
      </div>

      <div className='flex justify-center items-end pt-[50px]'>
        <div>
          <img src={bottomLeftImage}></img>
          <p className='pl-[90px]' >これまでの不動産売買</p>
        </div>
        <div>
            <img src={bottomRightImage}></img>
            <p className='pl-[50px]' >ふどうさん市場の「セルフセル方式」</p>
        </div>
      </div>

      <div className='flex items-start justify-center gap-12 pt-[35px]'>
        <div className='text-[24px]'> 
          <p>掲載・商談はセルフサービス</p>
        </div>
        <div className='w-[870px]'>

          <p className='p-[15px] bg-gray-200'>ふどうさん市場を利用することで、直接相手との交渉が可能となります。これはいわば「セルフサービス方式」と言えます。
            通常は不動産会社が斡旋から現物審査、契約成立まで一貫して対応しますが、ふどうさん市場では利用者自身がこれらの工程を支援なく自分で行うことになります。
            ただし、取引が合意に至った時点からは、国家資格を持つ不動産専門家が登録情報の確認から契約書類の作成まで全面サポートいたします。
            取引の信頼性と安全性を確保するこの二段階方式が家いちばの大きな特徴といえるでしょう。</p> 
        </div>
      </div>

      <div className='pt-[50px] flex justify-center font-bold text-[20px]'>
        <p className=''>セルフセル方式の特徴</p>
      </div>

      <div className='flex justify-center gap-[50px]'>
        <div >
          <p className='text-center text-[24px]'>メリット</p>
          <div className='bg-[#FFFFE0] border-[4px]  border-gray-300 rounded-[20px]  w-[400px] p-[30px]'>
            <ul className='list-disc text-[#D2691E]' >売主
              <li className='pt-[5px] text-black'>直接自分で買い手を選べる</li>
              <li className='pt-[5px] text-black' >自分の言葉で直接物件をアピールできる</li>
              <li className='pt-[5px] text-black'>わるいところも正直に伝えやすい</li>
              <li className='pt-[5px] text-black'>自分のペースで進められる</li>
            </ul>
            <ul className='list-disc text-[#191970] pt-[20px]' >買主
              <li className='pt-[5px] text-black'>売主の本音が聞ける</li>
              <li className='pt-[5px] text-black' >思い切った条件交渉などしやすい</li>
              <li className='pt-[5px] text-black'>売主の顔が見える安心感</li>
              <li className='pt-[5px] text-black'>掘り出し物の物件が見つかりやすい</li>
            </ul>
          </div>
        </div>

        <div >
          <p className='text-center text-[24px]'>デメリット</p>
          <div className='bg-[#F0F8FF] border-[4px]  border-gray-300 rounded-[20px]  w-[400px] p-[30px]'>
            <ul className='list-disc text-[#D2691E]' >売主
              <li className='pt-[5px] text-black'>自分で写真や文章を用意しないといけない</li>
              <li className='pt-[5px] text-black' >買い手の問合せに自分で対応しないといけない</li>
              <li className='pt-[5px] text-black'>質問の答えなど自分で調べないといけない</li>
              <li className='pt-[5px] text-black'>現地見学の立会いをしないといけない</li>
            </ul>
            <ul className='list-disc text-[#191970] pt-[20px]' >買主
              <li className='pt-[5px] text-black'>相手が売主本人だから礼儀など気をつかう</li>
              <li className='pt-[5px] text-black' >相手のペースに合わせないといけない</li>
              <li className='pt-[5px] text-black'>素人による説明が正確な情報かどうか分からない</li>
              <li className='pt-[5px] text-black'>場合によっては自分で調べるなども必要</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='pt-[50px] flex justify-center items-center gap-[100px]'>
        <div>
          <p className='text-center text-[24px] pb-[15px]'>ふどうさん市場の標準サービス</p>
          <div className='bg-[#FFFFE0] border-[4px]  border-gray-300 w-[500px] p-[30px]'>
              <ul className='list-disc ' ><p className='text-[#006400]'>１）料金プラン</p>
                <li className='pt-[5px] text-black'>不動産等の掲載費用: <br/> 販売総額の２％ <br/> 最低価格は30000円です。<br/></li>
                <li className='pt-[5px] text-black' >不動産業者、行政書士、投資家 <br/> 1区画月50000円 <br/>2枠100000円</li>
              </ul>
              <ul className='list-disc text-[#191970] pt-[20px]' ><p className='text-[#006400]'>２）不動産の売買</p>
                <li className='pt-[5px] text-black'>不動産の持ち主がまず自分を登録する。これは掲載されません。</li>
                <li className='pt-[5px] text-black' >不動産の持ち主が掲載する(掲載時には無料)。</li>
                <li className='pt-[5px] text-black'>売買の時に不動産業者、または司法書士を選んで手続きをする。<br/>
                不動産の売買で「セルフサービス」は心配かもしれません。不動産ならではの難しさ、専門知識が必要な場面も多いことでしょう。そこでふどうさんは、商談がまとまってからは、国家資格の宅建士が安い料金であらためて物件調査から行い、法律に定められた書式で契約書類をまとめることが標準サービスとなっています。
                </li>
                <li className='pt-[5px] text-black'>売買後に決められた送金先に入金する。</li>
              </ul>
            </div>
        </div>

        <div>
          <img className='w-[400px] h-[400px]' src = {bottomcontractImage}></img>
        </div>
      </div>

      <div className='flex justify-center items-center gap-[100px] py-[100px] '>
      <button onClick={() => history.push("/post-realestate")} className=" bg-[#2A6484] text-white px-[115px] py-[14px] text-[24px] rounded-[20px]">売ります</button>
      <button onClick={() => history.push("/item-board")} className=" bg-[#2A6484] text-white px-[115px] py-[14px] text-[24px] rounded-[20px]">買います</button>
      </div>

    </div>
  )
}
