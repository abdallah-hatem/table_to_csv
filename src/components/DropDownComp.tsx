import { Dropdown, Space } from "antd"
import React, { useEffect } from "react"
import { DownOutlined } from "@ant-design/icons"

export default function DropDownComp({
  title,
  items,
  onItemClick,
  setSelCourse,
}: any) {
  return (
    <Dropdown
      menu={{
        items,
        onClick: (e) => setSelCourse(e),
      }}
      trigger={["click"]}
      className="self-end border-[2px] p-1 mb-5 cursor-pointer"
    >
      <p>
        <Space>
          {title}
          <DownOutlined />
        </Space>
      </p>
    </Dropdown>
  )
}
