import { Google, Kakao } from '@/components'

const LoginPage = () => {
  const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
  console.log(baseURL)
  return (
    <>
      <Kakao />
      <Google />
    </>
  )
}
export default LoginPage
