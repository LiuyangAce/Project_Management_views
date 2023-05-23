import UserApi from './user'
import TestApi from './test'
import DefectApi from './defect'
import InterfaceApi from './interface'

export default {
  ...UserApi,
  ...TestApi,
  ...DefectApi,
  ...InterfaceApi
}