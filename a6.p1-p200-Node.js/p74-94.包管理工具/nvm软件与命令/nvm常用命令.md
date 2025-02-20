`nvm`（Node Version Manager）是一个用于管理多个 Node.js 版本的工具。它允许你轻松地在不同的项目中使用不同的 Node.js 版本，而不需要重新安装系统级的 Node.js。

以下是一些常用的 `nvm` 命令：

1. **列出所有可用的 Node.js 版本**:

   nvm ls
   

2. **安装特定版本的 Node.js**:
   
   nvm install <version>
   
   例如：
   
   nvm install 16.13.0
   

3. **使用特定版本的 Node.js**:
   
   nvm use <version>
   
   例如：
   
   nvm use 16.13.0
   

4. **删除已安装的 Node.js 版本**:
   
   nvm uninstall <version>
   

5. **查看当前正在使用的 Node.js 版本**:
   
   nvm current
   

6. **列出远程仓库中的所有 Node.js 版本**:
   
   nvm ls-remote
   

7. **更新 nvm 到最新版本**:
   
   nvm update
   

8. **安装最新的稳定版 Node.js**:
   
   nvm install stable
   

9. **安装最新的 Node.js 版本**:
   
   nvm install latest
   

10. **设置默认的 Node.js 版本**:
    
    nvm alias default <version>
    

11. **清除缓存**:
    
    nvm cache clear
    

12. **显示 nvm 帮助信息**:
    
    nvm help
    

请注意，`nvm` 命令可能需要在你的 shell 配置文件（如 `.bashrc`, `.zshrc` 或 `.profile`）中进行适当的设置才能正常工作。如果你是第一次使用 `nvm`，可能需要运行 `source ~/.bashrc` 或相应的命令来加载配置。