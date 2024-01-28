import { Spin, Table } from "antd"
import { useQuery } from "react-query"
import CourseDropDown from "../components/CourseDropDown"
import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"

export default function Users() {
  const fetchUsersData = async (courseId: any) => {
    const response = await fetch(
      `https://jsonblob.com/api/1196587799003652096?course_id=${courseId}`
    )
    const data = await response.json()
    return data
  }

  const [selCourse, setSelCourse] = useState<any>(null)

  const { data, isLoading, status, refetch } = useQuery(
    ["usersKey", selCourse?.key],
    () => fetchUsersData(selCourse.key),
    {
      enabled: !!selCourse,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => console.log(data, "data"), [data])

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ]

  function spinner() {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Spin size="large" />
      </div>
    )
  }

  if (isLoading) return spinner()

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center w-[70%] m-auto">
      <div className="self-end flex flex-row gap-4 items-center">
        <CourseDropDown setSelCourse={setSelCourse} selCourse={selCourse} />
        {data ? (
          <CSVLink
            filename={"usersData.csv"}
            data={data.users}
            className="border-[2px] p-1 mb-5 cursor-pointer"
            asyncOnClick
          >
            Export to CSV
          </CSVLink>
        ) : (
          <button
            className="border-[2px] p-1 mb-5 cursor-pointer opacity-[0.5]"
            disabled
          >
            Export to CSV
          </button>
        )}
      </div>
      {data ? (
        <div className="border-[2px] rounded-md w-full">
          <Table
            dataSource={data.users}
            columns={columns}
            pagination={{ pageSize: 7 }}
          />
        </div>
      ) : (
        <Spin size="large" />
      )}
    </div>
  )
}
