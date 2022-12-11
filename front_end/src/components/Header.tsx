import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
  const [pathName, setPathName] = useState(window.location.pathname);
  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.currentTarget.dataset.pathName) return;
    setPathName(e.currentTarget.dataset.pathName);
  };
  return (
    <header>
      <a className="gnb__logo" href="/home">
        <h1 className="a11y">레진 코믹스</h1>
      </a>
      <nav className="gnb">
        <h2 className="a11y">네비게이션</h2>
        <ul className="gnb__list">
          <li className="gnb__item">
            <Link
              to="/scheduled"
              title="연재"
              data-path-name="/scheduled"
              className={pathName.includes('/scheduled') ? 'on' : ''}
              onClick={onClickLink}
            >
              연재
            </Link>
          </li>
          <li className="gnb__item">
            <Link
              to="/romance"
              title="로맨스"
              data-path-name="/romance"
              className={pathName.includes('/romance') ? 'on' : ''}
              onClick={onClickLink}
            >
              로맨스
            </Link>
          </li>
          <li className="gnb__item">
            <Link
              to="/boys"
              title="소년"
              data-path-name="/boys"
              className={pathName.includes('/boys') ? 'on' : ''}
              onClick={onClickLink}
            >
              소년
            </Link>
          </li>
          <li className="gnb__item">
            <Link
              to="/drama"
              title="드라마"
              data-path-name="/drama"
              className={pathName.includes('/drama') ? 'on' : ''}
              onClick={onClickLink}
            >
              소년
            </Link>
          </li>
          <li className="gnb__item">
            <Link
              to="/bl"
              title="BL"
              data-path-name="/bl"
              className={pathName.includes('/bl') ? 'on' : ''}
              onClick={onClickLink}
            >
              BL
            </Link>
          </li>
          <li className="gnb__item">
            <Link
              to="/nsfw"
              title="후방주의"
              data-path-name="/nsfw"
              className={pathName.includes('/nsfw') ? 'on' : ''}
              onClick={onClickLink}
            >
              후방주의
            </Link>
            <sup>19+</sup>
          </li>
          <li className="gnb__item">
            <Link
              to="/free"
              title="무료"
              data-path-name="/free"
              className={pathName.includes('/free') ? 'on' : ''}
              onClick={onClickLink}
            >
              무료
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
