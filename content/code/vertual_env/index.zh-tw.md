
# 如何建立虛擬環境
下面是假設建立Python 虛擬環境
## 第 1 步：建立 Python 虛擬環境
虛擬環境就像一個獨立的沙盒，所有安裝的函式庫只會在這個沙盒中生效，不會影響到您系統上其他的 Python 專案。

開啟終端機(Terminal)。

使用 conda 建立新的虛擬環境：
conda 是 Anaconda 的套件管理器，建立虛擬環境非常方便。我們將建立一個名為 gemini-env 的新環境，並指定使用 Python 3.11 版本，因為它是目前穩定且推薦的版本。

``` bash
conda create --name gemini-env python=3.11
```
系統會詢問您是否確認安裝，請輸入 y 並按下 Enter。

## 第 2 步：啟動新的虛擬環境
建立完成後，您需要啟動這個虛擬環境，之後的所有操作都將在這個環境中進行。

啟動 gemini-env 環境：

```Bash
conda activate gemini-env
```
✅ 確認： 成功啟動後，您的終端機提示符前面應該會從 (base) 變成 (gemini-env)。這表示您現在已經在全新的、乾淨的環境中了。

## 第 3 步：安裝所有必要的函式庫
現在我們在新的虛擬環境中，可以放心地安裝所有開發 Gemini 小程式所需的函式庫了。我們將使用 pip 來安裝，但這次因為環境是乾淨的，不會有舊的依賴衝突。

確保 pip 本身是最新的：

```Bash

python -m pip install --upgrade pip
安裝所有開發 Gemini 後端所需的函式庫：
一次性安裝所有函式庫會更有效率。
```
```Bash
pip install fastapi uvicorn python-multipart google-generativeai httpx
```
💡 備註： 如果您之前遇到 grpcio 的編譯問題，這一次因為我們是在一個乾淨的環境中安裝，通常會順利很多。如果還是遇到問題，可以嘗試使用 conda 來安裝這幾個套件：

Bash

conda install -c conda-forge google-generativeai httpx
然後再用 pip 安裝其他幾個。

第 4 步：設定 Gemini API 金鑰
現在環境已經準備好，我們來設定金鑰，以便程式可以正確呼叫 Gemini API。

建立一個 .env 檔案：
在您的專案資料夾中（也就是您存放 main.py 和 index.html 的地方），建立一個新檔案，並將其命名為 .env。

編輯 .env 檔案：
在檔案中加入以下內容，並將 您的_GEMINI_API_金鑰 替換為您的實際金鑰：

程式碼片段

GEMINI_API_KEY="您的_GEMINI_API_金鑰"
安裝 python-dotenv 函式庫：
我們需要這個函式庫來讓 FastAPI 應用程式能夠讀取 .env 檔案中的金鑰。

Bash

pip install python-dotenv
修改 main.py：
在 main.py 的最上方，新增這兩行程式碼來載入 .env 檔案。

Python

import os
from dotenv import load_dotenv

load_dotenv() # 在這裡載入環境變數

# ... 後續的程式碼
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "") # 這行可以保留，但現在它會從 .env 讀取金鑰了
第 5 步：運行您的 FastAPI 應用程式
現在，所有環境和設定都已完成，您可以運行您的應用程式了。

在同一個終端機視窗中 (確保 (gemini-env) 仍然是啟動狀態)，導航到您的專案資料夾。

Bash

cd /您的/專案/資料夾/路徑
運行 Uvicorn 伺服器：

Bash

uvicorn main:app --reload
如果一切順利，您會看到 Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit) 的訊息。

如何管理虛擬環境和節省空間
如果您未來不再需要某個專案的虛擬環境，您可以隨時將它移除來釋放空間。

開啟終端機。

移除虛擬環境：

Bash

conda env remove --name gemini-env
這個命令會完全刪除名為 gemini-env 的虛擬環境，所有安裝在裡面的函式庫也會被一併刪除，並釋放出佔用的儲存空間。

總結來說，虛擬環境雖然會佔用一些空間，但它提供了一個乾淨、隔離的開發環境，可以避免許多混亂和錯誤，是一個非常值得的選擇。


這個問題問得很好，要查看您目前有哪些虛擬環境，有兩種常用的 conda 命令可以做到。

如何查看所有虛擬環境
請在您的 Mac 終端機中，輸入以下任一命令並按下 Enter：

conda env list

conda info --envs

這兩個命令的功能完全相同，都會列出您所有已建立的虛擬環境。

輸出範例
當您執行命令後，您會看到類似以下的輸出：

# conda environments:
#
base                  * /Users/1020824woaixiaoxiong/opt/anaconda3
gemini-env               /Users/1020824woaixiaoxiong/opt/anaconda3/envs/gemini-env
my-project-env           /Users/1020824woaixiaoxiong/opt/anaconda3/envs/my-project-env
如何解讀輸出
第一欄 (base, gemini-env, my-project-env)：這是您為虛擬環境取的名字。

星號 (*)：星號旁邊的環境表示這是您目前正在使用的活動環境 (active environment)。例如，在上面的範例中，base 環境是目前啟動的。

第二欄 (路徑)：這是每個虛擬環境在您電腦上的實際儲存位置。

如果您想切換到 gemini-env 環境，只需執行 conda activate gemini-env，然後再次執行 conda env list，您就會看到星號移動到 gemini-env 旁邊了。