import './css/App.css';
import { List } from 'antd';
import 'antd/dist/antd.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

const someData = [
    {
        id: 'gary',
        sort: 1,
        name: 'Gary Goodspeed',
        thumb: '/images/gary.png'
    },
    {
        id: 'cato',
        sort: 0,
        name: 'Little Cato',
        thumb: '/images/cato.png'
    },

    {
        id: 'kvn',
        sort: 2,
        name: 'KVN',
        thumb: '/images/kvn.png'
    },
    {
        id: 'mooncake',
        sort: 3,
        name: 'Mooncake',
        thumb: '/images/mooncake.png'
    },
    {
        id: 'quinn',
        sort: 4,
        name: 'Quinn Ergon',
        thumb: '/images/quinn.png'
    }
];

export default function App() {
    const [listItems, setListItems] = useState(someData);

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        margin: `0 0 8px 0`,
        background: isDragging ? '#00000026' : 'transparent',
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? '#3098f12b' : 'transparent',
        padding: '8px',
        width: 250,
        position: 'relative'
    });

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        console.log(result);

        const clonedListItems = JSON.parse(JSON.stringify(listItems));
        const [reorderedItem] = clonedListItems.splice(result.source.index, 1);
        clonedListItems.splice(result.destination.index, 0, reorderedItem);

        setListItems(clonedListItems);
        console.log('handleOnDragEnd', clonedListItems);
    }

    return (
        <div className='App'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='DropId'>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
                            <List
                                bordered
                                rowKey='Id'
                                dataSource={listItems}
                                size='small'
                                renderItem={(item, index) => (
                                    <Draggable draggableId={`draggable-${index}`} index={index} key={`draggable-${index}`}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                            >
                                                <List.Item>{item.name}</List.Item>
                                            </div>
                                        )}
                                    </Draggable>
                                )}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
