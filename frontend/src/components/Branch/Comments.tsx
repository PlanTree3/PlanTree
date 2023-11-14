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
  const updateInfo = async () => {
    try {
      const response: any = await detailBuds(treeId, budId)
      const data = response.data.comments ?? null
      console.log(response)
      if (data) {
        setComments(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    updateInfo()
  }, [open, budId, treeId])

  const handleCommentSubmit = async () => {
    setCounts(counts + 1)
    setNewComment('')
    const data = {
      content: newComment,
    }
    try {
      await commentCreate(treeId, budId, data)
      updateInfo()
    } catch (error) {
      console.error(error)
    }
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
        <TextField
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          margin="normal"
          fullWidth
          label="New Comment"
          multiline
          rows={2}
          inputProps={{ maxLength: 49 }}
        />
        <div>{`${newComment.length} / 50`}</div>
        <Button onClick={handleCommentSubmit} color="primary">
          등록!
        </Button>
        {comments.length > 0 ? (
          comments.map((comment: Comment, index) => (
            <p key={index}>{comment.content}</p>
          ))
        ) : (
          <p>아직 등록된 댓글이 없습니다.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Comments
