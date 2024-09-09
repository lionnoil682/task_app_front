import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PageTitle from './PageTitle';
import AddItem from './AddItem';
import Modal from './Modal';
import Item from './Item';
import { fetchGetItemsData } from '../redux/slices/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSkeleton from './Home/LoadingSkeleton';

const ItemPanel = ({ pageTitle, filterCompleted, filterImportant }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const getTasksData = useSelector((state) => state.api.getItemsData);
  const userkey = authData?.sub;

  const [loading, setLoading] = useState(false);

  // console.log(loading);

  // console.log(getTasksData);
  useEffect(() => {
    if (!userkey) {
      return;
    }
    const fetchGetItems = async () => {
      try {
        setLoading(true);
        await dispatch(
          fetchGetItemsData(userkey)
          // useEffect 내부에서 dispatch 함수를 호출할 떄는 async/await를 사용할 수 없을때 unwrap()을 사용
        ).unwrap();
      } catch (error) {
        console.log('Failed to fetch items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGetItems();
  }, [dispatch, userkey]);

  // 1. home 메뉴를 서택할 때:
  // - all메뉴를 선택하면 첫번째 filter 조건이 true이므로 모든 task를 반환
  // - 1번에서 반환된 모든 tasks를 대상으로 두번째 filter 조건을 적용
  // - filterImportant가 undefined이면 조건이 true 이므로 모든 task를 반환

  // 2. Completed 메뉴를 선택할 때:
  // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
  // - filterCompleted가 true이면 task.iscompleled가 true인 task만 반환

  // 3. Proceeding 메뉴를 선택할 때:
  // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
  // - filterCompleted가 false이면 task.iscompleled가 false인 task만 반환

  // 4. Important 메뉴를 선택할 때:
  // - 첫번째 필터 조건에서 if문이 true이므로 두번째 필터 조건으로 이동
  // - 두번째 filter 조건에서 filterImportant가 없으면 true이므로 모든 task를 반환(home, Completed, Proceeding과 동일)
  // - filterImportant가 true이면 task.isimportant가 true인 task만 반환

  const filteredTasks = getTasksData
    ?.filter((task) => {
      if (filterCompleted === 'all') return true;
      return filterCompleted ? task.iscompleted : !task.iscompleted;
    })
    .filter((task) => {
      if (filterImportant === undefined) return true;
      return filterCompleted ? task.isimportant : !task.isimportant;
    });
  console.log(filteredTasks);

  return (
    <div className="panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-2 px-4 overflow-y-auto">
      {userkey ? (
        <div className="panel-wrapper">
          {isOpen && <Modal />}
          <PageTitle title={pageTitle} />

          <div className="items flex flex-wrap">
            {loading ? (
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                width="100%"
                height="25vh"
              >
                <LoadingSkeleton />
                <LoadingSkeleton />
              </SkeletonTheme>
            ) : (
              filteredTasks?.map((item, idx) => <Item key={idx} task={item} />)
            )}
            <AddItem />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md w-fit">
            <span className="text-sm font-semibold">Login to Your Account</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemPanel;
