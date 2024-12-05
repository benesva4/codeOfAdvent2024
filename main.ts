import { walk } from '@std/fs'

const dayPrefix = Deno.args[0]

// Function to search for a file by prefix
async function runFile(prefix: string) {
  const targetFile = await findFileByPrefix(prefix)

  if (targetFile) {
    console.log(`Running file: ${targetFile}\n`)
    const command = new Deno.Command('deno', {
      args: ['run', '--allow-read', targetFile],
      stdout: 'piped',
      stderr: 'piped',
    })

    const { stdout, stderr } = await command.outputSync()
    if (stdout) {
      console.log(new TextDecoder().decode(stdout))
    }
    if (stderr) {
      console.log(new TextDecoder().decode(stderr))
    }
  } else {
    console.log(`No file found with prefix "${prefix}"`)
  }
}

// Function to find the first matching file with the given prefix
async function findFileByPrefix(prefix: string): Promise<string | null> {
  for await (const entry of walk('.')) {
    if (entry.isFile && entry.name.startsWith(prefix)) {
      return entry.path
    }
  }
  return null
}

runFile(`${dayPrefix}_`)
