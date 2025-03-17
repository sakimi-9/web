<template>
  <div class="wraps">
    <div>
      <el-input v-model="search.keyWord" style="width:300px;" placeholder="请输入名称搜索"></el-input>
      <el-button @click="init" style="margin-left:10px;">搜索</el-button>
      <el-button @click="openDialog" type="primary" style="margin-left:10px;">添加</el-button>
    </div>
    <el-table border :data="tableData" style="width: 100%;margin-top: 30px;">
      <el-table-column prop="name" label="名字" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column prop="id" label="id" />
      <el-table-column>
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button @click="deleteRow(scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
      @current-change="changeSize" 
      style="float:right;margin-top:10px;" 
      background 
      layout="prev, pager, next" 
      :total="total" 
    />
  </div>

  <el-dialog v-model="dialogVisible" :title="form.id ? '编辑用户' : '添加用户'" width="50%">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item prop="desc" label="描述">
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
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addUser, updateUser, delUser, getList } from './api'

const formRef = ref<FormInstance>()
const total = ref<number>(0)

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
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  desc: [
    { required: true, message: '请输入描述', trigger: 'blur' }
  ]
})

// 重置表单
const resetForm = () => {
  form.name = ""
  form.desc = ""
  form.id = 0
}

// 表格数据
const tableData = ref([])

// 弹框控制
const dialogVisible = ref<boolean>(false)

// 打开添加对话框
const openDialog = () => {
  resetForm()
  dialogVisible.value = true
}

// 初始化表格数据
const init = async () => {
  try {
    const response = await getList(search)
    tableData.value = response?.data || []
    total.value = response?.total || 0
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('获取数据失败')
  }
}

// 页面加载时初始化数据
onMounted(() => {
  init()
})

// 分页切换
const changeSize = (page: number) => {
  search.page = page
  init()
}

// 保存数据
const save = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
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
        ElMessage.error('保存失败')
      }
    }
  })
}

// 删除数据
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

// 编辑数据
const edit = (row: any) => {
  dialogVisible.value = true
  Object.assign(form, row)
}

// 关闭弹框
const close = () => {
  dialogVisible.value = false
}
</script>

<style scoped lang='less'>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  background: #f5f7fa;
}

.wraps {
  height: 100vh;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style> 