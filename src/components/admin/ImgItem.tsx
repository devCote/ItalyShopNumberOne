import React from 'react';

const ImgItem = ({
  id,
  imageUrl,
  handleImgChange,
}: {
  id: number;
  imageUrl: [any];
  handleImgChange: (arg: any) => void;
}) => {
  if (imageUrl[id]) console.log(imageUrl[id]);
  return (
    <React.Fragment>
      <img
        id={`${id}`}
        src={imageUrl[id] ? imageUrl[id] : null}
        onClick={handleImgChange}
        className='admin_img_prew'
        alt=''
      ></img>
    </React.Fragment>
  );
};

export default ImgItem;
