import React from 'react';

const NotFound = () => {
  return (
    <main className="error">
      <h2 className="error__title fs-35">음? 뭔가 잘못되었어요.</h2>
      <div className="error__code">
        <img src="//ccdn.lezhin.com/files/assets/img/jaymee-404.png" alt="ERROR 404" />
      </div>
    </main>
  );
};

export default NotFound;
