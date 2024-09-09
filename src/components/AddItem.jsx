import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';

const AddItem = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'create', task: null }));
  };
  return (
    <div className="add-card w-1/3 h-[30vh] p=[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md flex items-center justify-center">
        <button
          className="flex items-center gap-x-2 group "
          onClick={handleOpenModal}
        >
          <IoAdd className="w-8 h-8 text-gray-400 font-light hover:text-gray-200" />
          <span className="font-customFontEn text-gray-400 group-hover:text-gray-200">
            할일 추가하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddItem;
