## I. 全体構成:
### 1. 全体構成図:
![](apigateway-firehose-rds.png)

### 2. Logic Diagram:
![](logic-diagram.png)

### 3. 処理流れ	
- Userから定期的にAPI Gateway呼び出し、位置情報をプッシュする
    - 位置情報はJSONタイプのデータ
- API GatewayからデータをKinesis Firehoseに移動する。
    - Firehoseでデータが一定の時間にバッファされ、現在の設定は1Mbと60秒
	- いずれか上の条件を超えると、JSONデータをCSVタイプに変換するLambdaが呼ばされる
	- Firehoseの結果はS3に保存する。
- S3からRDSにデータを書き込む。
	- SQSにFirehoseのデータを送るためS3トリガー
	- SQSでRDSにデータ書き込むため、Lambdaを呼び出す。