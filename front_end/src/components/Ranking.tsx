import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import rankApi from '../api/rankApi';

import { ComicTypes, listComicsResQuery } from '../store/filter/types';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filterAction } from '../store/filter/reducers';

import useOnScreen from '../lib/useOnScreen';
import { getPeriodName, getGenreName } from '../lib/getName';

import refreshWhite from '../styles/img/refresh-white.svg';
import refreshBlack from '../styles/img/refresh-black.svg';

interface RankingProps {
  target: string;
}

const Ranking = ({ target }: RankingProps) => {
  const dispatch = useDispatch();

  const [comics, setComics] = useState<ComicTypes[]>([]);
  const [page, setPage] = useState(1);
  const [resetFilterHover, setResetFilterHover] = useState<boolean>(false);

  const { contentStateFilter, freedEpisodeFilter } = useSelector(
    (state: RootState) => state.filter
  );

  const willScrollRef = useRef<HTMLDivElement>(null);

  const onScreen = useOnScreen(willScrollRef);

  const { data: comicsData, refetch: comicsRefetch } = useQuery<listComicsResQuery>(
    'listComics',
    () => {
      return rankApi.listComics({ page, genre: target });
    }
  );

  // when scroll reached to bottom set page +1
  useEffect(() => {
    if (onScreen) {
      setPage(page + 1);
    }
  }, [onScreen]);

  // when filter status changed, set comics status
  useEffect(() => {
    if (!comicsData) return;
    if (contentStateFilter && freedEpisodeFilter) {
      setComics(
        comicsData.data.filter(
          (comic) => comic.contentsState === contentStateFilter && comic.freedEpisodeSize > 2
        )
      );
    } else if (contentStateFilter && !freedEpisodeFilter) {
      setComics(comicsData.data.filter((comic) => comic.contentsState === contentStateFilter));
    } else if (!contentStateFilter && freedEpisodeFilter) {
      setComics(comicsData.data.filter((comic) => comic.freedEpisodeSize > 2));
    } else {
      setComics(comicsData.data);
    }
  }, [contentStateFilter, freedEpisodeFilter]);

  // if page or target changed, refetch comics data
  useEffect(() => {
    console.log(target);
    comicsRefetch();
  }, [page, target]);

  // if comicsData changed with filter
  useEffect(() => {
    if (!comicsData) return;
    // 완결/연재 필터 있음 && 첫페이지 아님 && 무료필터 있음
    if (contentStateFilter && page !== 1 && freedEpisodeFilter) {
      setComics(
        comics.concat(
          comicsData.data
            .filter((comic) => comic.contentsState === contentStateFilter)
            .filter((comic) => comic.freedEpisodeSize > 2)
        )
      );
      // 완결/연재 필터 있음 && 첫페이지 아님 && 무료필터 없음
    } else if (contentStateFilter && page !== 1 && !freedEpisodeFilter) {
      setComics(
        comics.concat(comicsData.data.filter((comic) => comic.contentsState === contentStateFilter))
      );
      // 완결/연재 필터 있음 && 첫페이지 && 무료필터 있음
    } else if (contentStateFilter && page === 1 && freedEpisodeFilter) {
      setComics(
        comicsData.data.filter(
          (comic) => comic.contentsState === contentStateFilter && comic.freedEpisodeSize > 2
        )
      );
      //  완결/연재 필터 있음 && 첫페이지 && 무료필터 없음
    } else if (contentStateFilter && page === 1 && !freedEpisodeFilter) {
      setComics(comicsData.data.filter((comic) => comic.contentsState === contentStateFilter));
      // 완결/연재 필터 없음 && 첫페이지 && 무료필터 있음
    } else if (!contentStateFilter && page === 1 && freedEpisodeFilter) {
      setComics(comicsData.data.filter((comic) => comic.freedEpisodeSize > 2));
      // 완결/연재 필터 없음 && 첫페이지 && 무료필터 없음
    } else if (!contentStateFilter && page === 1 && !freedEpisodeFilter) {
      console.log('여기아님?');
      setComics(comicsData.data);
    }
    // 완결/연재 필터 없음 && 첫페이지 아님 && 무료필터 있음
    else if (!contentStateFilter && page !== 1 && freedEpisodeFilter) {
      setComics(comics.filter((comic) => comic.freedEpisodeSize > 2).concat(comicsData.data));
      // 완결/연재 필터 없음 && 첫페이지 아님 && 무료필터 없음
    } else {
      setComics(comics.concat(comicsData.data));
    }
  }, [comicsData]);

  useEffect(() => {
    setComics([]);
  }, [target]);

  const onClickContentStateFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.dataset.contentState) return;
    dispatch(
      filterAction.changeContentStateFilter({
        contentStateFilter: e.currentTarget.dataset.contentState,
      })
    );
    setPage(1);
  };

  const onClickFreedEpisodeFilter = () => {
    dispatch(filterAction.changeFreedEpisodeFilter({ freedEpisodeFilter: !freedEpisodeFilter }));
    setPage(1);
  };

  const onClickResetFilter = () => {
    dispatch(filterAction.changeContentStateFilter({ contentStateFilter: '' }));
    dispatch(filterAction.changeFreedEpisodeFilter({ freedEpisodeFilter: false }));
    setPage(1);
    if (page !== 1) {
      setComics([]);
    }
  };

  const onMouseOverResetFilter = () => {
    setResetFilterHover(true);
  };

  const onMouseLeaveResetFilter = () => {
    setResetFilterHover(false);
  };

  return (
    <main className="rank">
      <h2 className="rank__title fs-30">{getGenreName(target)} 장르 랭킹</h2>
      <section className="rank__filter">
        <div
          className={contentStateFilter === 'scheduled' ? 'filter__item on' : 'filter__item'}
          onClick={onClickContentStateFilter}
          data-content-state="scheduled"
        >
          연재 중
        </div>
        <div
          className={contentStateFilter === 'completed' ? 'filter__item on' : 'filter__item'}
          onClick={onClickContentStateFilter}
          data-content-state="completed"
        >
          완결
        </div>
        <div
          className={freedEpisodeFilter ? 'filter__item on' : 'filter__item'}
          onClick={onClickFreedEpisodeFilter}
        >
          무료회차 3개 이상
        </div>
        <div
          className="filter__item"
          onClick={onClickResetFilter}
          onMouseOver={onMouseOverResetFilter}
          onMouseLeave={onMouseLeaveResetFilter}
        >
          <img
            src={resetFilterHover ? refreshWhite : refreshBlack}
            alt="refresh"
            width={15}
            className="refresh__icon"
          />
          <span>필터 초기화</span>
        </div>
      </section>
      <div className={!comics || comics.length === 0 ? 'comics vacant' : 'comics'}>
        {comics &&
          comics.length > 0 &&
          comics.map((comic) => {
            const {
              id,
              title,
              thumbnailSrc,
              currentRank,
              previousRank,
              artists,
              freedEpisodeSize,
              contentsState,
              schedule,
            } = comic;
            return (
              <article className="comics__item" key={id}>
                <div className="comic__image">
                  <img src={thumbnailSrc} alt={title} />
                </div>
                <div className="comic__description">
                  <div className="rank__number">
                    <div className="rank__number--current fs-40">{currentRank}</div>
                    <div
                      className={`rank__number--changed ${
                        currentRank > previousRank
                          ? 'down'
                          : currentRank < previousRank
                          ? 'up'
                          : 'no'
                      }`}
                    >
                      <span>
                        {Math.abs(currentRank - previousRank) === 0
                          ? '-'
                          : Math.abs(currentRank - previousRank)}
                      </span>
                    </div>
                  </div>
                  <div className="description__detail">
                    <h3 title={title} className="detail__title">
                      {title}
                    </h3>
                    <h4>
                      {artists
                        .filter(
                          (artist) =>
                            artist.role === 'writer' ||
                            artist.role === 'painter' ||
                            artist.role === 'scripter'
                        )
                        .map((artist) => artist.name)
                        .join(', ')}
                    </h4>
                    <div>{freedEpisodeSize > 0 ? `${freedEpisodeSize}화 무료` : ''}</div>
                    <div>
                      {contentsState === 'completed'
                        ? '완결'
                        : `매주 ${schedule.periods
                            .map((period) => getPeriodName(period))
                            .join(', ')} 연재`}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
      <div ref={willScrollRef}></div>
    </main>
  );
};

export default Ranking;
