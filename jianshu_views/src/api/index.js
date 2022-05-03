import UserApi from './user'
import TestApi from './test'
import DefectApi from './defect'

export default {
  ...UserApi,
  ...TestApi,
  ...DefectApi
}