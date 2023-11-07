import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const handleCommentClick = (commentId: number) => {
  console.log(commentId)
  Swal.close()
}
const handleComment = (comments: any) => {
  const MySwal = withReactContent(Swal)
  const content = (
    <div>
      {comments?.map((comment: any) => (
        <div key={comment.commentId}>
          <br />
          <button onClick={() => handleCommentClick(comment.commentId)}>
            {comment.title} : {comment.userName}
          </button>
          <br />
        </div>
      ))}
    </div>
  )
  if (comments) {
    MySwal.fire({
      title: 'Comments',
      html: content,
      width: 600,
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
      confirmButtonText: 'Close',
    })
  } else {
    Swal.fire({
      title: 'Comments',
      text: '등록된 댓글이 없습니다.',
      width: 600,
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
      confirmButtonText: 'Close',
    })
  }
}

export { handleComment }
