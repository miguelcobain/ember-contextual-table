import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var selection, deselection;

moduleForComponent('dt-selection-column', 'Integration | Component | dt selection column', {
  integration: true,

  beforeEach() {
    selection = 0;
    deselection = 0;

    this.on('selected', function(){
      selection++;
    });

    this.on('deselected', function(){
      deselection--;
    });
  }
});

test('renders in basic form as default checkbox', function(assert) {
  this.render(hbs`{{dt-selection-column isRowSelected=true rowSelected=(action 'selected') rowDeselected=(action 'deselected')}}`);

  assert.equal(this.$('input:eq(0)').is(':checked'), true);

  this.$('input:eq(0)').prop('checked', false);
  this.$('input:eq(0)').change();
  assert.equal(deselection, -1);

  this.$('input:eq(0)').prop('checked', true);
  this.$('input:eq(0)').change();
  assert.equal(selection, 1);
});

test('renders in block form as button', function(assert) {
  this.set('selected', true);

  this.render(hbs`
    {{#dt-selection-column isRowSelected=selected rowSelected=(action 'selected') rowDeselected=(action 'deselected') as |col|}}
        <button {{action col.change (if col.isRowSelected false true)}}>
          {{if col.isRowSelected 'Selected' 'Not Selected'}}-{{col.body}}
        </button>
    {{/dt-selection-column}}
  `);

  assert.equal(this.$('button').text().trim(), 'Selected-true');

  this.$('button').click();
  assert.equal(deselection, -1);
  this.set('selected', false);
  assert.equal(this.$('button').text().trim(), 'Not Selected-true');

  this.$('button').click();
  assert.equal(selection, 1);
  this.set('selected', true);
  assert.equal(this.$('button').text().trim(), 'Selected-true');
});
