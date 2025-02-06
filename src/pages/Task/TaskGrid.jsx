import React, { useState } from "react";
import "./Taskgrid.css"; // Import CSS file
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Row, Col, Card, Button, Dropdown, Menu, Space } from "antd"; // Import Ant Design components
import { PlusOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";

const TaskItem = ({ id, title, array }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, animateLayoutChanges: () => false });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "pointer",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        style={{ cursor: "auto", height: "auto", width: "100%" }}
        className="task-item"
        title={title}
        bordered={true}
        extra={
          <MoreOutlined
            {...attributes}
            {...listeners}
            style={{ cursor: "grab", fontSize: "16px" }}
          />
        }
      >
        {array.map((item) => (
          <p key={item.id}>{item.job}</p>
        ))}
      </Card>
    </div>
  );
};

const TaskGrid = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "title 1",
      array: [
        { id: "1a", job: "job 1" },
        { id: "2a", job: "job 2" },
        { id: "1af", job: "job 3" },
        { id: "2ag", job: "job 4" },
      ],
    },
    {
      id: "2",
      title: "title 2",
      array: [
        { id: "3a", job: "job 1" },
        { id: "4a", job: "job 2" },
      ],
    },
    {
      id: "3",
      title: "title 3",
      array: [
        { id: "5a", job: "job 1" },
        { id: "6a", job: "job 2" },
        { id: "2fg", job: "job 4" },
      ],
    },
    {
      id: "4",
      title: "title 4",
      array: [
        { id: "7a", job: "job 1" },
        { id: "8a", job: "job 2" },
      ],
    },
    {
      id: "5",
      title: "title 5",
      array: [
        { id: "9a", job: "job 1" },
        { id: "10a", job: "job 2" },
      ],
    },
    {
      id: "6",
      title: "title 6",
      array: [
        { id: "11", job: "job 1" },
        { id: "12", job: "job 2" },
      ],
    },
    {
      id: "7",
      title: "title 7",
      array: [
        { id: "13", job: "job 1" },
        { id: "14", job: "job 2" },
      ],
    },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="taskgrid-header">
        <h1 style={{ flex: 1 }}>Task Grid</h1>
        <div className="search">
          <input placeholder="Search" style={{ width: 250 }} />
          <Button type="primary">Search</Button>
        </div>
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm
          </Button>
          <Dropdown overlay={userMenu}>
            <Space style={{ cursor: "pointer" }}>
              <UserOutlined style={{ fontSize: "16px" }} /> User Name
            </Space>
          </Dropdown>
        </Space>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks} strategy={rectSortingStrategy}>
          <Row gutter={[16, 16]} className="task-grid">
            {tasks.map((task) => (
              <Col key={task.id} span={6}>
                <TaskItem id={task.id} title={task.title} array={task.array} />
              </Col>
            ))}
          </Row>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default TaskGrid;
