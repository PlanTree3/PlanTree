import React, { useState } from 'react'
// import axios from 'axios';
import ReactModal from 'react-modal'
import pencil from '../../public/pencil.png'
import Button from '@/components/Button/Button'

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

  return (
    <div>
      <div className="flex flex-row">
        <div>그룹 이름</div>
        <img
          src={pencil}
          alt=""
          // onClick={}
        />
        <Button label="가지 일괄 등록" className="primary" onClick={} />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customModalStyles}
          ariaHideApp={false}
          contentLabel="Pop up Message"
          shouldCloseOnOverlayClick={false}
        >
          wow
        </Modal>
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
