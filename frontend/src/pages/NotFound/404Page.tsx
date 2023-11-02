import './404Page.css'
import notFound from '../../../public/404.gif'

const NotFoundPage = () => {
  return (
    <div className="container">
      <img src={notFound} alt="" />
      {/* <div className="not-found-page-container">
      <div className="not-found-page-content">
        <div className="not-found-page-text">
          <div>페이지를 찾을 수 없습니다</div>
          <div>오른쪽의 책갈피를 눌러 다른 페이지로 이동해주세요</div>
        </div>
      </div>
    </div> */}
    </div>
  )
}

export default NotFoundPage
