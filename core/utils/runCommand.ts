import { exec } from "node:child_process"

export function runCommand(
  command: string,
  fullPath: string,
): Promise<{
  stdout: string
  stderr: string
}> {
  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        cwd: fullPath,
      },
      (err, stdout, stderr) => {
        if (err) {
          reject(err)
        } else {
          resolve({ stdout, stderr })
        }
      },
    )
  })
}
