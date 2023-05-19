module.exports = {
  global: {
    error: "Hata",
    success: "Başarılı",
    areYouSure: "Emin misin",
    confirm: "Onayla",
    decline: "Reddet"
  },
  bot: {
    info: {
      stats: {
          name: "İstatistikler",
          guilds: "Sunucu",
          users: "Kullanıcı",
          channels: "Kanal",
      },
      versions: {
          name: "Sürümler",
      },
      pings: {
          name: "Gecikmeler"
      }
    },
    help: {
      author: "Sunucu dilini değiştir",
      description: "{client_username} dilini **bu sunucuda** değiştirmek istiyorsanız, \`/language\` yazmanız yeterli olacaktır.",
      author2: "Ticket sistemi nasıl kurulur",
      description2: "Ticket sistemini kurmak için, `/ticket` yazarak istenen adımları yapın."
    },
  ticket: {
    button: {
      close: "Kapat",
      force: "Zorla kapat",
      blacklist: "Kara liste"
    },
    log: {
      title: "Ticket kayıtları",
      closeDescription: "İşlem: `Bilet kapatmak`\nBileti kapatan: <@{user_id}>\nKapatan kimliği: `{user_id_2}`\nBilet sahibi: <@{creator_id}>\nSahip kimliği: `{creator_id_2}`\nBilet numarası: `{ticket_code}`"
    },
    blacklist: {
      blackListErr: "Bu sunucuda **karalisteye** alındığın için **bilet** açamazsın.",
      ownerErr: "Sunucu sahipleri **karalisteye** eklenemez.",
      botErr: "Robotlar **karalisteye** eklenemez.",
      success: "<@{user}> başarılı bir şekilde **karalisteye** eklendi.",
      auErr: "Bu kullanıcı zaten karalistede.",
      channelMsg: "> Burada neler oluyor?\n  `-` Belli ki bir kullanıcı **karalisteye** alınmış. Mesajların kayıtlı kalması için **kanal silinmedi.**"
    },
    whitelist: {
      auErr: "Bu kullanıcı zaten **karalistede** değil.",
      success: "<@{user}> başarılı bir şekilde **karalisteden** çıkarıldı."
    },
    firstTicket: "<:award_confetti:953969846851366933> Tebrikler! `{guild_name}` sunucusu için **ilk** bileti siz açtınız. <#{channel}>",
    ticketCreated: "Biletiniz başarıyla oluşturuldu! <#{channel_id}>",
    limitErr: "Bu sunucu, toplam bilet limitine ulaşmış. Lütfen bir biletin kapatılmasını bekleyin ve tekrar deneyin.",
    closeAreYouSure: "> Bu bileti kapatmak istediğinize emin misiniz? Bu işlem **geri** alınamaz.",
    timeFormat: 'D [gün], H [saat], m [dakika], s [saniye]',
    channelCreateMessage: ":wave: Merhaba, <@{user}>\nBiletiniz başarıyla açıldı. Lütfen yetkililer gelirken **sabır** ile bekleyin.\n> Bu sunucudaki yetkililer bilete ortalama `{response_time}` içerisinde cevap veriyor.",
    ticketButton: "Bilet oluşturun",
    createTicket: "Butona tıklayın ve **bilet** oluşturun.",
    success: "Ticket sistemi başarılı bir şekilde ayarlandı!",
    areYouSure: "> Emin misin? Ticket kanalı <#{channel_id}> ve yetkili rolü <@&{role_id}> olarak ayarlanacak. Ayarlanan kanala bir **Bilet açma** mesajı gönderilecek.",
    channelErr: "Bu komutu kullanabilmek için bir **kanal** etiketlemelisiniz.",
    roleErr: "Bu komutu kullanabilmek için bir **rol** etiketlemelisiniz."
  },
  language: {
    change: "Sunucu diliniz başarılı bir şekilde değiştirildi."
  },
    permErr: "Bu komutu **kullanabilmek** için gerekli yetkilere sahip değilsiniz."
  }
}