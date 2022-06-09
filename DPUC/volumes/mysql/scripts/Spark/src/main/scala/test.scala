import org.apache.spark.sql.{SaveMode, SparkSession}
import org.apache.spark.sql.functions.{col, lit, monotonically_increasing_id}

object test {
  def main(args: Array[String]) = {
    //Create Spark session
    val spark = SparkSession.builder()
      .master("local")
      .appName("Spark 2 Recruitment Challenge")
      .getOrCreate()

    var df = spark.read.json("src/main/resources/dpuc_2021.json").withColumn("ects",col("ects").cast("integer"))

    df.printSchema()

    df.show()

    val df_1 = df.groupBy("id", "nome").max("ects").alias("ects").withColumn("uo_id", lit(0)).withColumn("ac_id", lit(0))

    df_1.printSchema()

    //df_1.show()
    df_1.write.mode(SaveMode.Overwrite).json("/resources/ucs.json")

    val df_2 = df.withColumn("criacao_edicao", lit(0)).withColumn("estado", lit(5)).withColumn("uc_id",monotonically_increasing_id()+17).withColumn("utilizadores_id", lit(0)).select("criacao_edicao", "horas_trabalho", "Objetivos_pt", "Conteudos_pt", "CoerenciaConteudos_pt", "Metodologias_pt", "CoerenciaMetodologias_pt", "Bibliografia_pt", "Observacoes_pt", "regime_faltas", "Requisitos_pt", "Avaliacao_pt", "AprendizagemAtiva_pt", "estado", "semestre", "uc_id", "utilizadores_id")

    //df_2.show()
    df_2.write.mode(SaveMode.Overwrite).json("/resources/dpucs.json")
  }
}
