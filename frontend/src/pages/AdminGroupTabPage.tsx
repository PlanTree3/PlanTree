// import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios';
import Rooster from '../../public/Rooster.png'
import Seal from '../../public/Seal.png'
import './GroupPage.css'
// import AdminGroupPage from './AdminGroupPage'

const AdminGroupTabPage = () => {
  return (
    <div>
      <div className="flex flex-row">
        <div>
          <text>내 둥지 확인하기</text>
          <br />
          <Link to="/adminNest">
            <button className="box-border w-2/3 p-5 border-4 bg-amber-400 rounded-3xl">
              <div className="flex flex-row">
                <img className="chick flex flex-start" src={Rooster} alt="" />
                <div className="flex items-center text-white tracking-widest">
                  여기는 그룹이름임
                  <br />
                  둥지장동지:
                  <br />
                  병아리 동지:
                </div>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <text>내 그룹 확인하기</text>
          <br />
          <Link to="/adminGroup">
            <button className="box-border w-2/3 p-5 border-4 bg-cyan-500 rounded-3xl">
              <div className="flex flex-row">
                <img className="chick flex flex-start" src={Seal} alt="" />
                <div className="flex items-center text-white tracking-widest">
                  그룹 리스트 <br /> 확인하러 가기
                </div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminGroupTabPage
