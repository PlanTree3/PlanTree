import React, { useState } from 'react'
// import axios from 'axios';
import ReactModal from 'react-modal'
import pencil from '../../public/pencil.png'
import Button from '@/components/Button/Button'
import './GroupPage.css'

// type StudentList = {
//   students: GroupStudentListResponse;
// };

const AdminGroupDetailPage: React.FC<StudentList> = ({ students }) => {
  const [page, setPage] = useState(1)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // const studentsPerPage = 5;
  // const startIndex = (page - 1) * studentsPerPage;
  // const endIndex = startIndex + studentsPerPage;
  // const currentStudents = students.slice(startIndex, endIndex);

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
  // const previousPage = () => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };

  // const nextPage = () => {
  //   if (endIndex < students.length) {
  //     setPage(page + 1);
  //   }
  // };

  // const customModalStyles = {
  //   overlay: {
  //     className: 'custom-overlay',
  //   },
  //   content: {
  //     className: 'custom-content',
  //   },
  // }

  return (
    <div>
      <div className="flex flex-row">
        <div>그룹 이름</div>
        <img
          src={pencil}
          alt=""
          // onClick={}
        />
        <Button
          label="가지 일괄 등록"
          className="primary"
          onClick={openModal}
        />
        <ReactModal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              width: '100%',
              height: '100vh',
              zIndex: 10,
              top: 0,
              left: 0,
            },
            content: {
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '30%',
              height: '30%',
              border: '2px solid #000',
              borderRadius: '10px',
              overflow: 'auto',
              background: '#F5F5DC',
              boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <h1 className="flex justify-center h-[20%] items-center text-2xl bg-lime-100 rounded-[10px]">
            가지 일괄 등록
          </h1>
          <div className="p-[5%]">가지가지</div>
        </ReactModal>
      </div>
      {/* <div className="box-border h-2/3 w-2/3 p-5 border-4 bg-amber-700 rounded-3xl">
    {currentStudents.map((student) => (
          <div key={student.studentId} className="student-box">
            <p>학생 ID: {student.studentId}</p>
            <p>학생 이름: {student.studentName}</p>
            <p>진행한 버드 수: {student.completedBudCount}</p>
            <p>전체 버드 수: {student.totalBudCount}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default AdminGroupDetailPage
