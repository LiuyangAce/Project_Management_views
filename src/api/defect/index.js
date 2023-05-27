export default {
  //查询所有缺陷（分页）
  DEFECT_ADD: {
    path: '/defect/add',
    method: 'post',
  },
  // //查询所有缺陷（分页）
  DEFECT_FINDALL: {
    path: '/defect/findAll',
    method: 'post',
  },
  //通过条件查询所有缺陷（分页）
  DEFECT_FINDALL_BYCONDITION: {
    path: '/defect/findAllByCondition',
    method: 'post',
  },
  //添加缺陷
  ADD_DEFECT: {
    path: '/defect/add',
    method: 'post',
  },
  // 更新缺陷
  UPDATE_DEFECT: {
    path: '/defect/update',
    method: 'post',
  },
  FIND_INFO: {
    path: '/defect/findInfo',
    method: 'get',
  },
  TYPES_DEFECT: {
    path: '/defect/findDefectTypes',
    method: 'get'
  }
}
