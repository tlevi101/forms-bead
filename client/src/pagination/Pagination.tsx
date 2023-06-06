import { PaginationProps } from "../Types";
import PaginationController from "./PaginationController";
import React, {useEffect, useState} from "react";

const Pagination = ({
  collectionSize,
  pageSize,
  pageTurn,
}: PaginationProps) => {
  const [pagination, setPagination] = useState<PaginationController>(new PaginationController(collectionSize, pageSize));

  useEffect(() => {
    pageTurn(pagination.page);
  }, [pagination]);

  const turnPageTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if(!pagination){
      return;
    }
    const pageNumber = parseInt(e.currentTarget.id.split("-")[1]);
    setPagination(pagination.turnPageTo(pageNumber).clone());
  };

  const turnPageNext = () => {
    if(!pagination){
      return;
    }
    setPagination(pagination.incrementCurrentPageBy(1).clone());
  };

  const turnPagePrevious = () => {
    if(!pagination){
      return;
    }
    setPagination(pagination.incrementCurrentPageBy(-1).clone());
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${pagination.page !== 1 ? "" : "disabled"}`}>
          <a className="page-link" onClick={turnPagePrevious}>
            Previous
          </a>
        </li>
        <li className={`page-item ${pagination.page === 1 ? "active" : ""}`}>
          <a className="page-link" id={"page-1"} onClick={turnPageTo}>
            1{" "}
          </a>
        </li>
        <li
          className={`page-item disabled ${
            pagination.first - 1 === 1 ? "d-none" : ""
          }`}
        >
          <a className="page-link">...</a>
        </li>
        {Array.from(Array(pagination.SliderSize).keys()).map((_: any, index: number) => {
          return (
            <li
              key={`pagination-page-${pagination.first + index}`}
              className={`page-item ${
                pagination.first + index === pagination.page ? "active" : ""
              }`}
            >
              <a
                className={"page-link"}
                id={`page-${pagination.first + index}`}
                onClick={turnPageTo}
              >
                {pagination.first + index}
              </a>
            </li>
          );
        })}
        <li
          className={`page-item disabled ${
            pagination.pageCount <= pagination.first + pagination.SliderSize ? "d-none" : ""
          }`}
        >
          <a className="page-link">...</a>
        </li>
          <li className={`page-item ${pagination.pageCount===1 ? 'd-none' : ''} ${pagination.pageCount === pagination.page ? 'active' : ''}`}>
                <a className="page-link" id={`page-${pagination.pageCount}`} onClick={turnPageTo}>{pagination.pageCount }</a>
          </li>
          <li className="page-item">
            <a className={`page-link ${pagination.page !== pagination.pageCount ? '' : 'disabled'} `} onClick={turnPageNext}>Next</a>
          </li>
      </ul>
    </nav>
  );
};

export default Pagination;
