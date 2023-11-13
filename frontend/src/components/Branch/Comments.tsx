import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/store.ts'
import { commentCreate, detailBuds } from '@/apis'

interface Comment {
  id: number
  createdAt: Date
  modifiedAt: Date
  issuerId: string
  name: string
  role: string
  content: string
}

interface CommentsProps {
  open: boolean
  handleClose: () => void
  budId: string
  budName: string
  commentCount: number
}

const Comments: React.FC<CommentsProps> = ({
  open,
  handleClose,
  budId,
  budName,
  commentCount,
}) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [counts, setCounts] = useState(commentCount)
  const treeId = useSelector((state: RootState) => state.main.treeId)
  const updateInfo = () => {
    const response: any = detailBuds(treeId, budId)
    // api 404로 인한 주석처리
    // const data: Comment[] | null = response.data.comments ?? null
    console.log(response)
    // if (data) {
    //   setComments(data)
    // }
  }
  useEffect(() => {
    updateInfo()
  }, [open, budId])
  const handleCommentSubmit = () => {
    setCounts(counts + 1)
    setNewComment('')
    const data = {
      content: newComment,
    }
    commentCreate(treeId, budId, data)
    updateInfo()
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="article-dialog-title"
      aria-describedby="article-dialog-description"
    >
      <DialogTitle id="article-dialog-title">{budName}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="article-dialog-description" tabIndex={-1}>
          현재 댓글 수 : {counts}
        </DialogContentText>
        <div>
          <TextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            margin="normal"
            fullWidth
            label="New Comment"
            multiline
            rows={4}
          />
          <Button onClick={handleCommentSubmit} color="primary">
            등록!
          </Button>
          <p>댓 글 리 스 트</p>
          {comments ? (
            comments.map((comment: Comment, index) => (
              <p key={index}>{comment.content}</p>
            ))
          ) : (
            <p>등록된 댓글이 없습니다.</p>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Comments
