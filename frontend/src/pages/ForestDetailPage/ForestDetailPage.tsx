import './ForestDetailPage.css'

const ForestDetailPage = () => {
  return (
    <div>
      <div className="forest-detail-date-input">
        <div>나의 나무</div>
        <div>
          <input type="date" id="start" /> 부터
          <input type="date" id="end" /> 까지
        </div>
      </div>
      <div>나무</div>
      <div>나무</div>
      <div>나무</div>
      <div>나무</div>
    </div>
  )
}

export default ForestDetailPage
