// import React, { useEffect, useState } from 'react';

import chick from '../../public/chick.png'
import forest from '../../public/forest_tmp.png'
import './GroupPage.css'
// import axios from 'axios';
// import StudentGroupPageResponse from '../types/GroupStudentType'

// const tmpData = [
//   {
//     studentId: 1,
//     studentName: '학생 1',
//     totalBudCount: 20,
//     completedBudCount: 15,
//   },
//   {
//     studentId: 2,
//     studentName: '학생 2',
//     totalBudCount: 30,
//     completedBudCount: 10,
//   },
//   {
//     studentId: 3,
//     studentName: '학생 3',
//     totalBudCount: 25,
//     completedBudCount: 20,
//   },
//   {
//     studentId: 4,
//     studentName: '학생 4',
//     totalBudCount: 15,
//     completedBudCount: 10,
//   },
//   {
//     studentId: 5,
//     studentName: '학생 5',
//     totalBudCount: 40,
//     completedBudCount: 35,
//   },
//   {
//     studentId: 6,
//     studentName: '학생 6',
//     totalBudCount: 22,
//     completedBudCount: 17,
//   },
// ]

const StudentGroupPage = () => {
  // const [data, setData] = useState<StudentGroupPageResponse | null>(null);

  // useEffect(() => {
  // const apiUrl = 'API URL자리임';
  //   axios
  //     .get<StudentGroupPageResponse>(apiUrl)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    // <div className="sketchbook">
    <div className="p-10">
      <div className="whiteBox pb-5">
        <text>내 둥지 확인하기</text>
        <div className="box-border h-30 w-2/3 p-5 border-4 bg-amber-700 rounded-3xl">
          <div className="flex flex-row">
            <img className="chick flex flex-start" src={chick} alt="" />
            <div className="flex items-center text-white tracking-widest">
              여기는 그룹이름임
              <br />
              둥지장동지:
              <br />
              병아리 동지:
            </div>
          </div>
        </div>
        <text>내 그룹 확인하기</text>
        <div className="flex-container">
          <img className="forest" src={forest} alt="" />
          <img className="forest" src={forest} alt="" />
          <img className="forest" src={forest} alt="" />
          <img className="forest" src={forest} alt="" />
          <img className="forest" src={forest} alt="" />
          <img className="forest" src={forest} alt="" />
        </div>
      </div>
    </div>
  )
}

export default StudentGroupPage
