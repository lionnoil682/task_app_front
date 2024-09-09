import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import { BiMessageDetail } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  fetchDeleteItemData,
  fetchGetItemsData,
  fetchUpdateCompletedData,
} from '../redux/slices/apiSlice';
import { openModal } from '../redux/slices/modalSlice';

const Item = ({ task }) => {
  const { _id, title, description, date, iscompleted, isimportant, userid } =
    task;
  // console.log(userid);
  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(iscompleted);

  // console.log(isCompleted);

  const deleteItem = async () => {
    const confirm = window.confirm('아이템을 삭제하시겠습니까?');

    if (!confirm) return;

    if (!_id) {
      toast.error('잘못된 사용자 접근 입니다.');
      return;
    }

    try {
      await dispatch(fetchDeleteItemData(_id)).unwrap();
      toast.success('아이템이 삭제되었습니다.');
      await dispatch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      toast.error('아이템 삭제에 실패했습니다.');
      console.error(error);
    }
  };

  const changeCompleted = async () => {
    // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
    // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.

    // 상태를 미리 업데이트 하여 반영된 값을 전달
    const newIsCompleted = !iscompleted;
    setIsCompleted(newIsCompleted);

    const updateCompletedData = {
      itemId: _id,
      isCompleted: newIsCompleted,
    };

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCompletedData),
    };

    await dispatch(fetchUpdateCompletedData(options)).unwrap();
    newIsCompleted
      ? toast.success('할일을 완료했습니다.')
      : toast.success('할일을 완료하지 못했습니다.');
    await dispatch(fetchGetItemsData(userid)).unwrap();
  };

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'update', task }));
  };

  const handleOpenDetailModal = () => {
    dispatch(openModal({ modalType: 'details', task }));
  };

  const textLengthOverCut = (txt, len, lastTxt) => {
    if (len == '' || len == null) {
      // 기본값
      len = 20;
    }
    if (lastTxt == '' || lastTxt == null) {
      // 기본값
      lastTxt = '...';
    }
    if (txt.length > len) {
      txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
  };
  return (
    <div className="item w-1/3 h-[30vh] p-[0.25rem] ">
      <div className="w-full h-full border border-gray-500 rounded-md flex py-3 px-4 flex-col justify-between bg-gray-950 overflow-y-auto">
        <div className="upper">
          <h2 className="text-xl font-normal mb-3 relative pb-2 flex justify-between">
            <span className="w-full h-[1px] bg-gray-500 absolute bottom-0"></span>
            {title}
            <button>
              <BiMessageDetail
                className="cursor-pointer"
                onClick={handleOpenDetailModal}
              />
            </button>
          </h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
        </div>
        <div className="lower">
          <p className="text-sm mb-1">{date}</p>
          <div className="item-footer flex justify-between">
            <div className="item-footer-left flex gap-x-1">
              {iscompleted ? (
                <button
                  className="block py-1 px-4 bg-blue-400 text-sm text-white rounded-md"
                  onClick={changeCompleted}
                >
                  Completed
                </button>
              ) : (
                <button
                  className="block py-1 px-4 bg-yellow-400 text-sm text-white rounded-md"
                  onClick={changeCompleted}
                >
                  Incompleted
                </button>
              )}

              {isimportant && (
                <button className="block py-1 px-4 bg-red-400 text-sm text-white rounded-md">
                  Important
                </button>
              )}
            </div>
            <div className="item-footer-right flex gap-x-3">
              <button>
                <FaRegEdit onClick={handleOpenModal} />
              </button>
              <button className="delete" onClick={deleteItem}>
                <FaRegTrashCan />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
