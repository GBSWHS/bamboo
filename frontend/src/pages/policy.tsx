import Header from "@/components/Header";
import { GlobalProps } from "@/utils/interfaces";
import styled from "styled-components";

export default function Policy(props: GlobalProps) {
  return (
    <Body>
      <Header />
      <Polic>
        <h2>경북소프트웨어고등학교 대나무숲 시행 규칙</h2>
        <strong>제 1조 (목적)</strong>
        <p>본 규칙은 경북소프트웨어고등학교 대나무숲 시행 규칙으로, 대나무숲의 투명한 운영과 종속을 목적으로 한다.</p>
        <strong>제 2조 (제보에 관한 규칙)</strong>
        <p>① 대나무숲에 작성된 제보가 다음에 해당하는 경우 해당 제보는 반려 처리될 수 있다.</p>
        <p className="tab">1. 특정 인물이나 단체의 실명을 거론하는 경우</p>
        <p className="tab">2. 실명이 거론되지 않더라도 특정 인물, 단체를 지칭하는 경우</p>
        <p className="tab">3. 특정 인물, 단체와의 친목을 다지기 위해 작성한 경우</p>
        <p className="tab">4. 욕설 및 비속어를 포함하는 경우</p>
        <p className="tab">5. 공격적인 어조로 작성한 경우</p>
        <p className="tab">6. 홍보를 목적으로 하는 경우</p>
        <p className="tab">7. 거래를 목적으로 하는 경우</p>
        <p className="tab">8. 설문조사를 포함하는 경우</p>
        <p className="tab">9. 분실물 회수를 목적으로 하는 경우</p>
        <p className="tab">10. 구인/구직을 목적으로 하는 경우</p>
        <p className="tab">11. 정치/종교 등 논란을 불러일으킬 여지가 있는 경우</p>
        <p className="tab">12. 타 고등학교 또는 학교를 비방, 비난하는 경우</p>
        <p className="tab">13. 지나치게 길거나 지나치게 짧은 경우</p>
        <p className="tab">14. 제보 반려 사유를 묻는 경우</p>
        <p className="tab">15. 분란을 조장하는 경우</p>
        <p className="tab">16. 기타 제보 중 관리자의 판단 아래 문제가 있다고 판단하는 경우</p>
        <p>② 제 2조 1항 2호에 해당하는 제보가 공익을 목적으로 하는 고발성 제보인 경우 관리자의 재량으로 게시될 수 있다. 단, 다음 기준들이 엄격히 적용된다.</p>
        <p className="tab">1. 실명 거론의 경우 초성처리나 블라인드 처리 등으로 대체된다.</p>
        <p className="tab">2. 육하원칙에 의거하여 작성되어야 한다.</p>
        <p className="tab">3. 근거 혹은 증거가 포함되어 있으면 안된다.</p>
        <p className="tab">4. 추측성 내용이 포함되어 있으면 안된다.</p>
        <p className="tab">5. 본교의 교사 혹은 교직원이 대상인 불만성 제보는 반려한다.</p>
        <p>③ 그 외에 제 2조 1항의 기준에 해당되는 제보이더라도 논란의 소지가 없다고 판단되는 범위 내에서 대나무숲 활성화를 위해 관리자의 재량으로 제보가 게시될 수 있다. 단, 다음 기준들이 적용된다.</p>
        <p className="tab">1. 홍보를 목적으로 하는 제보는 관리자에게 사전 허가를 받아야한다.</p>
        <p className="tab">2. 설문조사를 목적으로 하는 제보는 관리자에게 사전 허가를 받아야한다.</p>
        <strong>제 3조 (쿨타임 제도에 관한 규칙)</strong>
        <p>① 쿨타임 제도는 아래와 같습니다.</p>
        <p className="tab">1. 쿨타임의 영향은 관리자와 모든 유저에게 적용된다.</p>
        <p className="tab">2. 쿨타임은 한 게시글에 대해 1분으로 제한한다.</p>
        <p className="tab">3. 쿨타임 제도는 관리자의 재량으로 변경될 수 있다.</p>
        <strong>제 4조 (해킹, 부적절한 사용)</strong>
        <p>①. 대나무숲에서 해킹 또는 시스템 방해를 시도하는 행위는 법적인 책임을 지게 된다. 또한, 다음과 같은 행위는 금지된다.</p>
        <p className="tab">1. 타인의 개인정보를 유출하는 행위</p>
        <p className="tab">2. 대나무숲 시스템에 피해를 입히는 행위</p>
        <p className="tab">3. 시스템 분석을 통해서 게시물 도배를 하는 행위</p>
        <p></p>
        <strong>부칙</strong>
        <p>위 규칙에 사항이 없더라도 관리자 재량으로 반려하거나, 신고할 수 있다.</p>
      </Polic>
    </Body>
  )
}

const Body = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`

const Polic = styled.div`
  padding: 2rem;
  border-radius: 8px;
  background-color: #fff;

  h2 {
    margin-bottom: 2rem;
    font-weight: 800;
    font-size: 1.5rem;
  }

  strong {
    color: rgb(0,113,182);
    font-weight: 800;
  }

  p {
    padding-inline-start: 0;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: rgb(0, 78, 130);
    font-weight: 600;
  }

  p.tab {
    margin: 0;
    margin-left: 18px;
  }
`