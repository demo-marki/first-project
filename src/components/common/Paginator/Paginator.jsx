import styles from './Paginator.module.css';
import React, {useState} from "react";
import cn from "classnames";

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    for (let i = leftPortionPageNumber; i <= rightPortionPageNumber; i++) {
        pages.push(i);
    }

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
            <button onClick={ () => {setPortionNumber(portionNumber - 1)}}>PREV</button> }

            {pages.map((p) => {
                    return <span className={ cn({
                        [styles.selectedPage]: currentPage === p
                    }, styles.pageNumber)}
                                 key={p}
                                 onClick={(e) => {
                                     onPageChanged(p)
                                 }}>{p}</span>
                })}
        {portionCount > portionNumber &&
            <button onClick={ () => {setPortionNumber(portionNumber + 1)}}>NEXT</button> }

     </div>
}

export default Paginator;