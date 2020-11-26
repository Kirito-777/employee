import Mock from 'mockjs'
import axios from 'axios'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      // addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      // birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1),
      dname:Mock.Random.csentence(2,5),
      ename:Mock.Random.csentence(2,5),
      salary:Mock.Random.float(3000,20000,2,3),
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.dname.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: config => {
    const { name, age, sex, dname, ename, salary } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      age: age,
      sex: sex,
      dname: dname,
      ename: ename,
      salary:salary,
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      // -------delete员工 start
            axios({
                method: "post",
                url: "http://192.168.1.20:8080/staffManage/deleteemp",
                // url: "http://192.168.1.68:8080/staffManage/deleteemp",
                data:{
                  "id":id,
                }
              }).then((res) => {
                  console.log(res);
                  this.$message({
                    message: "删除成功！",
                    type: "suceess"
                  });
              });
              // -------delete员工 end
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { id, name, age, sex, dname, ename, salary } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    const dname_num = parseInt(dname)
    
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.age = age
        u.sex = sex_num
        u.dname = dname_num
        u.ename = ename
        u.salary = salary
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}