export const getCategory = (categoryNum) => {
  switch (categoryNum) {
    case 1:
      return "자유게시판";
    case 2:
      return "비밀게시판";
    case 3:
      return "졸업생게시판";
    case 4:
      return "새내기게시판";
    case 5:
      return "시사 이슈";
    case 6:
      return "정보게시판";
    case 7:
      return "HOT 게시물";
    case 8:
      return "공기업 게시판";
    case 9:
      return "홍보 게시판";
    default:
      return "게시판";
  }
};

export const getPinName = (categoryNum) => {
  switch (categoryNum) {
    case 1:
      return "isOnF";
    case 2:
      return "isOnS";
    case 3:
      return "isOnG";
    case 4:
      return "isOnN";
    case 5:
      return "isOnI";
    case 6:
      return "isOnInfo";
    default:
      return "게시판";
  }
};

export const formatDate = (date) => {
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const hour = date.substring(11, 13);
  const minute = date.substring(14, 16);

  return `${month}/${day} ${hour}:${minute}`;
};

export const isRecentBoard = (create) => {
  const date = new Date();
  const myTime = date - new Date(create);
  if (myTime < 1000 * 60 * 60 * 6) {
    // 6시간 이내 게시글이 있으면 new라고 줌
    return true;
  } else {
    return false;
  }
};
