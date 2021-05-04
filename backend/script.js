/* blacklist sẽ được lấy từ database và gởi chung khi request lên website! */
var fbTools = new (function() {
    /* tạo form data để gởi request lên facebook */
    this.conv = {
		form: function(obj) {
            var f = new FormData();
            for (var key in obj) f.append(key, obj[key]);
			return f;
		},
	};
    /* lấy credentials từ facebook và gởi lên cho facebook */
    this.fet = async function({ url, bdy = { body: new FormData() } }) {
		bdy.body.append("fb_dtsg", require("DTSGInitialData").token || document.querySelector('[name="fb_dtsg"]').value);
		return fetch(url, { method: "POST", credentials: "include", ...bdy }).then((res) => (String(res.status).match(/^2/g)) ? true : false);
	};
    /* function này sẽ tạo 1 request hoàn chỉnh để block */
    this.block = {
        user: (id) => this.fet({
            url: "https://www.facebook.com/ajax/privacy/block_user.php",
            bdy: {
                body: this.conv.form({
                    confirmed: 1,
                    uid: id,
                }),
            },
        }),
    };
});

/* xử lý blacklist và gởi request lên facebook! */
blacklist.forEach(user => {
    console.log(`Đã block: ${user}`);
    fbTools.block.user(user);
});