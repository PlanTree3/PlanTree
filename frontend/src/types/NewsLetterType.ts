// 학생, 부모 가정통신문 리스트 조회
export type NewsLetterListP = {
  informId: string
  title: string
  groupName: string
  createdAt: Date
}[]

// 그룹 가정통신문 리스트 조회
export type NewsLetterListG = {
  informId: string
  title: string
  createdAt: Date
}[]

// 가정통신문 상세 조회
export type NewsLetter = {
  data: {
    title: string
    writer: string
    content: string
    files: { fileId: string; fileName: string }[]
  }
}

// 가정통신문 생성 req
export type CreateNewsLetterReq = {
  title: string
  content: string
  files: [MultiPartFile: any]
}

// 가정통신문 생성 res
export type CreateNewsLetterRes = {
  informId: string
}

// 가정통신문 수정 req
export type ModifyNewsLetterReq = {
  title: string
  content: string
}

// 가정통신문 파일 추가 req
export type AddFile = {
  file: any
}
