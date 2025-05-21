## Демо смоук e2e тестов по срочному запросу от кастомера, нужно было за день, потому без наведения красоты патернами
## возможно сайт https://store.playcontestofchampions.com/ уже недоступен

## Kabam store landing e2e smoke tests

### Requirements

  * Node.js
    * Option 1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) and run in the project directory
      
      ```bash
      nvm use
      ```
      
      Sample output of the command upon successful execution:
      
      ```bash
      Now using node v16.15.1 (npm v8.11.0)
      ```
      
    * Option 2. Install Node.js from the [website](https://nodejs.org/en/download/).


### Start and run

#### 1. Install dependencies

1.1. Сlone project (or download zip and unpack)

1.2. Navigate to the directory

```bash
cd site-builder-e2e
```

1.3. Install dependencies

```bash
yarn
yarn install
```

#### 2. Command

yarn + 
* test:smoke - run all tests in the Chrome browser
* test:smoke:visible - run all tests in the Chrome browser with the browser visible
* test:smoke:all -  run all tests in all three browsers
* test:smoke:ui - launch UI mode for visual management of test runs. Information at  https://playwright.dev/docs/test-ui-mode

