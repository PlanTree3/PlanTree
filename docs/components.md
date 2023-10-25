```text
├── index.html
├── index.css
├── .eslintrc.cjs
├── .prettierrc
├── package.json
├── package-lock.json
├── tsconfig.json
└── src
    ├── pages
    │   ├── loading.tsx    
    │   ├── 404.tsx
    │   ├── _app.tsx
    │   └── user
    │       ├── index.tsx
    │       └── [id].tsx
    ├── main.tsx
    ├── routes.tsx
    └── vite-env.d.tsx

```
```ts

// HTTP 응답 상태 코드 상수 객체
const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

type UserState =
  | { status: 'loading' }
  | { status: 'success', data: UserData }
  | { status: 'error', error: string };

type UserData = {
  id: number;
  name: string;
  email: string;
};

const getUserData = async () : Promise<UserState> => {
  try {
    const response = await axios.get(`대충 유저 정보 가져오는 api`);
    if (response.status === HTTP_STATUS.OK) {
      return updateUserState(response.status, response.data);
    }
    return updateUserState(response.status);
  } catch (error) {
    if (error.response) {
      return updateUserState(error.response.status, error.response.data);
    } else {
      return { status: 'error', error: '네트워크 에러가 발생했습니다.', code: HTTP_STATUS.INTERNAL_SERVER_ERROR };
    }
  }
}

```

```json
{
  "branch": {
    "branchId": "number",
    "branchName": "string",
    "branchColor": "string",
    "seeds": {
      "seedId": "number",
      "seedName": "string"
    },
    "buds": {
      "budId": "number",
      "budName": "string",
      "comments": {
        "writterId": "number",
        "writterName": "string",
        "comment": "text",
        "createdAt": "time"
      },
      "dayOfWeek": "number | sting"
    }
  }
}

```

```json
{
  "buds": {
    "branchId": "number",
    "branchName": "string",
    "branchColor": "string",
    "budId": "number",
    "budName": "string",
    "comments": {
      "writterId": "number",
      "writterName": "string",
      "comment": "text",
      "createdAt": "time"
    },
    "dayOfWeek": "number | sting"
  }
}
```


```js
    week = [a, b, c, d, e]

    week.map((day) => {
      branch.buds.map((bud) => (
        if (bud.day === day) {
          <div
            key=budId+budName
          
          className={
              backgroundColor={this.color}
            }
            >
            {bud.budName}
        </div>
        }
      )
        
    })

    


```
10
객체.map((branch) => {
    color = branch.branchColor
    branch.buds.map((bud) => {
       


            .append(section:dayOfWeek) 
    }
    )
})

const section = [a, b, c, d, e]
a ~ e : mon ~ fri

if section~
    const array  = {
        id = busId,
        dayOfWeek = section,
    }
    axios.post(array)
    .then(() => axios.get(브랜치 정보)

