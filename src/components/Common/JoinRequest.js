import { useEffect, useState } from "react";
import client from "../../api/client";
import TimeAgo from "./TimeAgo";
import { useDispatch, useSelector } from "react-redux";
import {
  get_join_requests,
  filter_join_requests,
  approve_join_request,
  closeInlineNotify,
  reject_join_request,
} from "../../utils/userDataSlice";

const JoinRequest = (props) => {
  const inlineNotify = useSelector((store) => store.userData.inlineNotify);
  const dispatch = useDispatch();
  const joinRequests = useSelector(
    (store) => store.userData.team_joining_requests
  );
  console.log(joinRequests);
  const { id, name } = props.data;

  useEffect(() => {
    dispatch(get_join_requests(id));
  }, []);

  if (inlineNotify.showNotification) {
    setTimeout(() => {
      dispatch(closeInlineNotify());
      dispatch(filter_join_requests(inlineNotify));
    }, 1000);
  }

  const handleApproveRequest = (team_id, request_id) => {
    console.log(team_id, request_id);
    dispatch(approve_join_request({ team_id, request_id }));
  };

  const handleRejectRequest = (team_id, request_id) => {
    dispatch(reject_join_request({ team_id, request_id }));
  };

  return (
    <div className="text-black dark:text-gray-200 p-2">
      <h1 className="text-sm lg:text-lg text-gray-500 dark:text-gray-400">
        Team:{" "}
        <span className="font-bold text-lg lg:text-xl text-gray-700 dark:text-gray-200">
          {name}
        </span>
      </h1>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex">
          <h1 className="text-sm lg:text-lg text-gray-500 dark:text-gray-400 flex-1">
            Join Requests
          </h1>
          {inlineNotify.showNotification && (
            <p
              className={
                inlineNotify.message === "Approved!"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {inlineNotify.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {joinRequests?.count <= 0 && (
            <div className="border-t border-gray-700 p-4 flex justify-center">
              <p>No pending requests!</p>
            </div>
          )}
          {joinRequests?.results?.map((item) => (
            <div
              key={item.id}
              className="flex border p-2 border-gray-700 rounded-sm"
            >
              <div className="flex-1">
                <p>
                  {item?.user?.username}{" "}
                  <span className="text-sm text-gray-400">
                    <TimeAgo timestamp={item?.created_at} />
                  </span>
                </p>
              </div>
              <div className="text-gray-100 flex gap-2">
                <button
                  onClick={() => handleApproveRequest(id, item.id)}
                  className="bg-green-600 px-2 py-1 text-sm rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejectRequest(id, item.id)}
                  className="bg-red-600 px-2 py-1 text-sm rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinRequest;
