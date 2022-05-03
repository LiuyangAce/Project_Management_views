export default {
  //查询所有缺陷（分页）
  DEFECT_ADD: {
    path: 'http://localhost:3000/defect/add',
    method: 'post',
  },
  //查询所有缺陷（分页）
  DEFECT_FINDALL: {
    path: 'http://localhost:3000/defect/findAll',
    method: 'post',
  },
  //通过条件查询所有缺陷（分页）
  DEFECT_FINDALL_BYCONDITION: {
    path: 'http://localhost:3000/defect/findAllByCondition',
    method: 'post',
  },
  //添加缺陷
  ADD_DEFECT: {
    path: "http://localhost:3000/defect/add",
    method: 'post'
  },
  // 更新缺陷
  UPDATE_DEFECT: {
    path: 'http://localhost:3000/defect/update',
    method: 'post'
  }
}
