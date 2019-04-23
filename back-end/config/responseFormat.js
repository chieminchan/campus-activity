// 统一返回格式
module.exports = {
  errorRes: (err) => {
    return {
      'status': 1,
      'message': err,
      'results': []
    };
  },
  correctRes: (data) => {
    return {
      'status': 0,
      'message': '',
      'results': data
    };
  },
  correctRes_msg: (tips) => {
    return {
      'status': 0,
      'message': tips,
      'results': ''
    };
  },
  forbidden_msg: () => {
    return {
      'status': 403,
      'message': 'You do not have access to this page',
      'results': ''
    };
  }
};