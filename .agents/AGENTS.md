# Git Configuration

When executing `git` commands on this machine, be aware that the system PATH frequently drops the Git executable. 
The actual `git` executable is located at:
`C:\Users\Lenovo\AppData\Local\Temp\Git\cmd\git.exe`

If the system PATH does not resolve the standard `git` command, agents MUST use the absolute path to execute git operations (e.g., `& "C:\Users\Lenovo\AppData\Local\Temp\Git\cmd\git.exe" push`).
