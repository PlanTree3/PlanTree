import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios';
import './GroupPage.css'
import Seal from '../../public/Seal.png'
import yeji1 from '../../public/yeji1.png'
import gijeong1 from '../../public/gijeong1.png'

const StudentGroupDetailPage = () => {
  return (
    <div>
      <Link to="/studentGroup">
        <div className="arrow">
          <div className="pt-6">목록으로 돌아가기</div>
        </div>
      </Link>
      <h2>떡잎초 3학년 1반</h2>
      <div className="flex flex-row">
        <img className="h-40" src={Seal} alt="" />
        <div className="groupLeader">
          <text>그룹장: 정도현</text>
        </div>
      </div>
      <div className="studentBox">
        <div className="circle-image">
          <img src={yeji1} alt="" />/
        </div>
        <div>
          <text>정예지</text>
        </div>
      </div>
      <div className="studentBox">
        <div className="circle-image">
          <img src={gijeong1} alt="" />/
        </div>
        <div>
          <text>신기정</text>
        </div>
      </div>
      <div className="studentBox">
        <div className="circle-image">
          <img src={gijeong1} alt="" />/
        </div>
        <div>
          <text>신기정</text>
        </div>
      </div>
    </div>
  )
}

export default StudentGroupDetailPage
