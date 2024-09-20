# AI Coding Setups

This article reflects my experience setting up VSCode, Cursor and Zed, both for general editing and AI code generation.

I've used Visual Studio Code for years, and GitHub Copilot for at least 2. I've used inline suggestions almost all the time. Up until a few weeks ago I had not done any full up code generation until I started following the YouTube videos about exactly how to set things up. They started popping up on my feed about 3 months ago. There are some videos that give straightforward setup and usage of the AI coding alternatives. The crazy thing is that new stuff is popping up nearly every day.

I had the best luck with [AICodeKing](https://www.youtube.com/@AICodeKing). Their videos are practical, concise and stick to mostly code generation. Something new is posted almost every day. Their presentation is really good too, clear and sometimes funy. I also checkout [WorldOfAI](https://www.youtube.com/@intheworldofai), which has good ones and also covers other AI stuff besides coding. There are a lot of others.

Here's my take:

## Tools Used

- IDE's
  - VSCode
    - free
  - Cursor
    - free
    - paid $20/month for pro (larger AI limits)
  - Zed
    - free
- Code Generation Models
  - [Claude-3.5-sonnet](https://AnthropicAI.github.io/Claude-3.5-sonnet)
    - not free, but reasonably cheap
    - using Anthropic with API Key
    - prepay for tokens. I like this because it isn't recurring.
- Code Completion Models
  - [Codestral](https://mistral.ai/news/codestral/)
    - free when run with Ollama
    - runs locally!
    - works with:
      - VSCode
  - [GitHub Copilot](https://github.com/features/copilot)
    - not free ($10/month for individual)
    - works with:
      - VSCode
      - Cursor (but they recommend using CursorTab)
      - Zed
  - [CursorTab](https://www.cursor.com/cpp)
    - included with Cursor install
    - works with:
      - Cursor
  - [SuperMaven](https://supermaven.com/)
    - works with:
      - Zed
    - free tier or paid
    - not tested in this article

While Claude-3.5-sonnet is what I use (it's ranked highly on most benchmarks), it's reasonbly easy to use OpenAI or Gemini with these tools for the main code generation. For code completion, its easiest to use GitHub Copilot (not free) or Codestral (free) running locally with Ollama.

## VSCode

### Aider + Claude-3.5-sonnet + GitHub Copilot

#### Aider + Claude-3.5-sonnet + ContinueDev + Codestral

### ClaudeDev + Claude-3.5-sonnet + ClaudeDev + Continue.Dev + Codestral

## Cursor + Claude-3.5-sonnet + Cursor-Tab

## Zed + Claude-3.5-sonnet + GitHub Copilot
