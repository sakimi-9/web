<template>
  <div class="wraps">
      <div>
          <el-input v-model="search.keyWord" style="width:300px;" placeholder="请输入用户名称搜索"></el-input>
          <el-button @click="init" style="margin-left:10px;">搜索</el-button>
          <el-button @click="openDialog" type="primary" style="margin-left:10px;">添加</el-button>
      </div>
      <el-table border :data="tableData" style="width: 100%;margin-top: 30px;">
          <el-table-column prop="name" label="名字" />
          <el-table-column prop="desc" label="描述" />
          <el-table-column prop="id" label="ID" />
          <el-table-column label="标签" width="200">
              <template #default="scope">
                  <el-tag 
                    v-for="tag in scope.row.tags" 
                    :key="tag.id" 
                    style="margin-right: 5px; margin-bottom: 5px;"
                  >
                    {{ tag.tags }}
                  </el-tag>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
              <template #default="scope">
                  <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
                  <el-button @click="deleteRow(scope.row)" type="danger" size="small">删除</el-button>
                  <el-button @click="showTagDialog(scope.row)" type="success" size="small">添加标签</el-button>
              </template>
          </el-table-column>
      </el-table>
      <el-pagination 
        @current-change="change" 
        style="float:right;margin-top:10px;" 
        background 
        layout="prev, pager, next" 
        :total="total" 
      />
  </div>

  <el-dialog v-model="dialogVisible" :title="form.id ? '编辑用户' : '添加用户'" width="50%">
      <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item prop="name" label="名称" :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]">
              <el-input v-model="form.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item prop="desc" label="描述" :rules="[{ required: true, message: '请输入描述', trigger: 'blur' }]">
              <el-input v-model="form.desc" placeholder="请输入描述" type="textarea" :rows="3">
              </el-input>
          </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
              <el-button @click="close">关闭</el-button>
              <el-button type="primary" @click="save">
                  保存
              </el-button>
          </span>
      </template>
  </el-dialog>
  
  <el-dialog 
    v-model="isShowTag" 
    title="添加标签" 
    :close-on-click-modal="false" 
    :close-on-press-escape="false"
    append-to-body
  >
    <el-select 
      style="width:100%" 
      v-model="tags" 
      multiple 
      placeholder="请选择标签"
      popper-class="tag-select-dropdown"
    >
      <el-option value="tag1" label="标签1">tag1</el-option>
      <el-option value="tag2" label="标签2">tag2</el-option>
      <el-option value="tag3" label="标签3">tag3</el-option>
    </el-select>
    <template #footer>
      <div style="text-align: right; margin-top: 10px;">
        <el-button @click="isShowTag = false">取消</el-button>
        <el-button @click="addTa" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addUser, updateUser, delUser, getList, addTags } from './api/index'

// 表单引用
const formRef = ref<FormInstance>()

// 标签相关
const isShowTag = ref<boolean>(false)
const tags = ref<string[]>([])
const total = ref<number>(0)
const row = ref<{
  id?: number,
  name?: string,
  desc?: string,
  createTime?: Date,
  tags?: any[]
}>({})

// 显示标签对话框
const showTagDialog = (userData: any) => {
  row.value = userData
  isShowTag.value = true
  tags.value = [] // 清空之前选择的标签
}

// 添加标签
const addTa = async () => {
  if (!tags.value.length) {
    ElMessage.warning('请至少选择一个标签')
    return
  }

  try {
    await addTags({
      tags: tags.value,
      userId: row.value.id
    })
    ElMessage.success('标签添加成功')
    isShowTag.value = false
    tags.value = []
    init() // 刷新列表
  } catch (error) {
    console.error('添加标签失败:', error)
    ElMessage.error('添加标签失败')
  }
}

// 搜索参数
const search = reactive({
  keyWord: "",
  page: 1,
  pageSize: 10
})

// 表单数据
const form = reactive({
  name: "",
  desc: "",
  id: 0
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  desc: [
    { required: true, message: '请输入描述', trigger: 'blur' }
  ]
}

// 表格数据
const tableData = ref([])

// 弹框开关
const dialogVisible = ref<boolean>(false)

// 打开添加对话框
const openDialog = () => {
  form.id = 0
  form.name = ""
  form.desc = ""
  dialogVisible.value = true
}

// 初始化表格数据
const init = async () => {
  try {
    const response = await getList(search)
    console.log('API Response:', response) // 添加日志查看响应结构
    
    // 根据实际返回的数据结构调整
    if (response && response.data) {
      tableData.value = response.data
      total.value = response.data.total || 0
    } else {
      tableData.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('获取数据失败')
    tableData.value = []
    total.value = 0
  }
}

// 页面加载时初始化数据
onMounted(() => {
  init()
})

// 分页切换
const change = (page: number) => {
  search.page = page
  init()
}

// 保存和修改表格数据
const save = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    if (form.id) {
      await updateUser(form)
      ElMessage.success('更新成功')
    } else {
      await addUser(form)
      ElMessage.success('添加成功')
    }
    
    close()
    init()
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('表单验证失败或保存失败')
  }
}

// 删除表格数据
const deleteRow = async (row: any) => {
  try {
    await ElMessageBox.confirm('确定要删除该记录吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await delUser({ id: row.id })
    ElMessage.success('删除成功')
    init()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

// 获取详情
const edit = (userData: any) => {
  Object.assign(form, {
    id: userData.id,
    name: userData.name,
    desc: userData.desc
  })
  dialogVisible.value = true
}

// 关闭弹框
const close = () => {
  dialogVisible.value = false
}
</script>

<style lang='less'>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  background: #f0f2f5;
}

.wraps {
  height: 100vh;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>