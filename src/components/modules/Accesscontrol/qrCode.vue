<template>
    <div>
        <!--startprint-->
        <div class="QRcode">
			<img src="../../../assets/images/code.png" id="myImage" alt="暂无图片" />
			<p>华生创展合作A区栋大楼</p>
		</div>
        <!--endprint-->
        <div class="noprint">
            <el-button type="warning"  @click="doPrint($event)">打印</el-button>
        </div>
    </div>
</template>

<script>

export default{
     data () {
         return {

         }
     },
     methods:{
        doPrint (e){
            var bdhtml=window.document.body.innerHTML;
            // var sprnstr="<!--startprint-->";   
            // var eprnstr="<!--endprint-->";   
            // var prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);   
            // var prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));  
            // return;
            window.document.body.style.height = '500px'
            window.document.body.innerHTML=this.$el.innerHTML;
            this.pagesetup_null (); 
            window.print(); 
            window.location.reload(); 
        },
        pagesetup_null (){             
            var hkey_root,hkey_path,hkey_key;
            hkey_root="HKEY_CURRENT_USER"
            hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
            try{
                var RegWsh = new ActiveXObject("WScript.Shell");
                    hkey_key="header";
                    console.log(key_key);
                RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
                hkey_key="footer";
                RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
            }catch(e){}
        }
    }
}
</script>
<<style lang="scss" scoped>
    .QRcode {
        margin-top: 100px;
        width: 100%;
        height: 350px;

         img {
            display: block;
            width: 360px;
            height: 360px;
            margin: 0 auto;
        }
        P {
            width: 100%;
            line-height: 20px;
            text-align: center;
            font-size: 24px;
            color: rgba(41, 36, 36, 0.97);
            margin-top: 20px;
        }
    }
    .noprint{
        width:200px;
        height:80px;
        margin:0 auto;
        padding-top:90px;

        button{
            display:block;
            width:100%;
            height:40px;

            span{
                font-size:16px;
            }
        }
    }
     @media print {
        .noprint{
           display: none;
        }
    }
</style>


