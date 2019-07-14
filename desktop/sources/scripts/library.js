function Library (ronin) {
  this.open = (path, w = 1, h = 1) => {
    ronin.surface.open(path, { w, h })
    return path
  }

  this.folder = (path = ronin.source.path) => {
    const a = []
    if (path) {
      const folder = ronin.source.folder(path)
      if (fs.existsSync(folder)) {
        return fs.readdirSync(folder)
      }
    }
    return a
  }

  this.save = (path, type = 'jpg') => {
    console.log('save', path)
    // TODO: Save file
    return path
  }

  this.draw = (path, rect, callback) => {
    ronin.surface.draw(path, rect, callback)
    return rect
  }

  this.select = (rect = this.frame()) => {
    return ronin.surface.select(rect)
  }

  this.exit = () => {
    // TODO: Closes Ronin
  }

  // Logic

  this.gt = (a, b) => {
    return a > b
  }

  this.lt = (a, b) => {
    return a < b
  }

  this.eq = (a, b) => {
    return a === b
  }

  this.and = (...args) => {
    for (let i = 0; i < args.length; i++) {
      if (!args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  this.or = (...args) => {
    for (let i = 0; i < args.length; i++) {
      if (args[i]) {
        return args[i]
      }
    }
    return args[args.length - 1]
  }

  // Arrays

  this.map = (fn, arr) => {
    return arr.map(fn)
  }

  this.filter = (fn, arr) => {
    return arr.filter(fn)
  }

  this.reduce = (fn, arr, acc = 0) => {
    return arr.reduce(fn, acc)
  }

  this.len = (item) => {
    return item.length
  }

  this.first = (arr) => {
    return arr[0]
  }

  this.last = (arr) => {
    return arr[arr.length - 1]
  }

  this.rest = ([_, ...arr]) => {
    return arr
  }

  this.range = (start, end, step = 1) => {
    let arr = []
    if (step > 0) {
      for (let i = start; i <= end; i += step) {
        arr.push(i)
      }
    } else {
      for (let i = start; i >= end; i += step) {
        arr.push(i)
      }
    }
    return arr
  }

  // Shapes

  this.pos = (x, y, t = 'pos') => {
    return { x, y }
  }

  this.size = (w, h, t = 'size') => {
    return { w, h }
  }

  this.rect = (x, y, w, h, t = 'rect') => {
    return { x, y, w, h, t }
  }

  this.circle = (x, y, r, t = 'circle') => {
    return { x, y, r, t }
  }

  this.line = (a, b, t = 'line') => {
    return { a, b, t }
  }

  this.text = (x, y, g, s, f = 'Arial', t = 'text') => {
    return { x, y, g, s, f, t }
  }

  this.frame = () => {
    return ronin.surface.getFrame()
  }

  this.center = () => {
    const rect = this.frame()
    return this.pos(rect.w / 2, rect.h / 2)
  }

  this.path = (path) => {
    return path
  }

  this.scale = (rect, w, h) => {
    return { x: rect.x, y: rect.y, w: rect.w * w, h: rect.h * h }
  }

  // Copy/Paste

  this.clone = (a, b) => {
    ronin.surface.clone(a, b)
    return [a, b]
  }

  this.stroke = (shape = this.frame(), thickness, color) => {
    ronin.surface.stroke(shape, thickness, color)
    return shape
  }

  this.fill = (rect = this.frame(), color) => {
    ronin.surface.fill(rect, color)
    return rect
  }

  this.clear = (rect = this.frame()) => {
    ronin.surface.clear(rect)
    return rect
  }

  //

  this.of = (h, k) => {
    return h[k]
  }

  this.theme = (variable, el = document.documentElement) => {
    // ex. styleprop('--f_high') to get css variable value
    return getComputedStyle(el).getPropertyValue(variable)
  }

  // Math

  this.add = (...args) => {
    return args.reduce((sum, val) => sum + val)
  }

  this.sub = (...args) => {
    return args.reduce((sum, val) => sum - val)
  }

  this.mul = (...args) => {
    return args.reduce((sum, val) => sum * val)
  }

  this.div = (...args) => {
    return args.reduce((sum, val) => sum / val)
  }

  this.mod = (a, b) => {
    return a % b
  }

  this.clamp = (val, min, max) => {
    return Math.min(max, Math.max(min, val))
  }

  this.step = (val, step) => {
    return Math.round(val / step) * step
  }

  this.min = Math.min

  this.max = Math.max

  this.ceil = Math.ceil

  this.floor = Math.floor

  this.sin = Math.sin

  this.cos = Math.cos

  this.PI = Math.PI

  this.TWO_PI = Math.PI * 2

  // Generics

  this.echo = (...args) => {
    const msg = args.reduce((acc, val) => { return acc + val + ' ' }, '')
    ronin.log(msg)
    return args
  }

  this.print = (msg) => {
    ronin.log(msg)
    return msg
  }

  this.str = (...args) => {
    return args.reduce((acc, val) => { return acc + val }, '')
  }

  this.test = (name, a, b) => {
    if (Array.isArray(a)) {
      // TODO: make testing more solid
      a = a.toString()
      b = b.toString()
    }
    if (a !== b) {
      console.warn('failed ' + name, a)
    } else {
      console.log('passed ' + name, a, b)
    }
    return a === b
  }

  // Livecoding

  this.time = Date.now
}
